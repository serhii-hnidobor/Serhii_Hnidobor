import { HttpError, HttpCode, HttpHeader, HttpMethod } from '../../constants/constants';
import { getStringifiedQuery } from '../../helper/helpers';
import fetch, { Headers } from 'node-fetch';
class Http {
    constructor(defaultPreInterceptors, defaultPostInterceptors) {
        this.defaultPreInterceptors = defaultPreInterceptors;
        this.defaultPostInterceptors = defaultPostInterceptors;
    }
    async load({ url, options = {}, query, preInterceptors = this.defaultPreInterceptors, postInterceptors = this.defaultPostInterceptors, }) {
        const { method = HttpMethod.GET, payload = null } = options;
        const headers = this.getHeaders(options === null || options === void 0 ? void 0 : options.contentType);
        let requestInit = {
            method,
            headers,
            body: payload,
        };
        url = this.getUrl(url, query);
        for (const preInterceptor of preInterceptors) {
            [url, requestInit] = await preInterceptor({ url, options: requestInit });
        }
        console.log(requestInit.headers);
        console.log(url);
        console.log(requestInit.body);
        const makeRequest = (url, options) => fetch(url, options);
        let response = await makeRequest(url, requestInit);
        for (const postInterceptor of postInterceptors) {
            response = await postInterceptor({
                initialRequest: { options: requestInit, url },
                makeRequestFn: makeRequest,
                response,
            });
        }
        if (response.status === HttpCode.NO_CONTENT) {
            return {};
        }
        return this.checkStatus(response)
            .then((res) => this.parseJSON(res))
            .catch(this.throwError);
    }
    getHeaders(contentType) {
        const headers = new Headers();
        if (contentType) {
            headers.append(HttpHeader.CONTENT_TYPE, contentType);
        }
        return headers;
    }
    async checkStatus(response) {
        if (!response.ok) {
            const parsedException = await response
                .json()
                .then((parsed) => {
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed[0];
                }
                return parsed;
            })
                .catch(() => ({
                message: response.statusText,
            }));
            throw new HttpError({
                status: response.status,
                message: response.statusText,
                errorCode: parsedException.errorCode,
            });
        }
        return response;
    }
    getUrl(url, query) {
        return `${url}${query ? `?${getStringifiedQuery(query)}` : ''}`;
    }
    parseJSON(response) {
        return response.json();
    }
    throwError(err) {
        throw err;
    }
}
export { Http };
