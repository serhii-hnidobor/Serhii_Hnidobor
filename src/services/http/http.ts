import { HttpError, HttpOptions, HttpCode, HttpHeader, HttpMethod } from '../../constants/constants';
import { getStringifiedQuery } from '../../helper/helpers';
import { PostInterceptor, PreInterceptor } from './interceptors/interceptor';
import fetch, { Response, RequestInit, BodyInit, Headers } from 'node-fetch';

class Http {
  constructor(private defaultPreInterceptors: PreInterceptor[], private defaultPostInterceptors: PostInterceptor[]) {}

  async load<T = unknown>({
    url,
    options = {},
    query,
    preInterceptors = this.defaultPreInterceptors,
    postInterceptors = this.defaultPostInterceptors,
  }: {
    url: string;
    query?: Record<string, unknown>;
    options?: Partial<HttpOptions>;
    preInterceptors?: PreInterceptor[];
    postInterceptors?: PostInterceptor[];
  }): Promise<unknown> {
    const { method = HttpMethod.GET, payload = null } = options;
    const headers = this.getHeaders(options?.contentType);
    let requestInit: RequestInit = {
      method,
      headers,
      body: payload as BodyInit,
    };

    url = this.getUrl(url, query);
    for (const preInterceptor of preInterceptors) {
      [url, requestInit] = await preInterceptor({ url, options: requestInit });
    }
    const makeRequest = (url: string, options: RequestInit): Promise<Response> => fetch(url, options);

    let response = await makeRequest(url, requestInit);

    for (const postInterceptor of postInterceptors) {
      response = await postInterceptor({
        initialRequest: { options: requestInit, url },
        makeRequestFn: makeRequest,
        response,
      });
    }

    if (response.status === HttpCode.NO_CONTENT) {
      return {} as T;
    }

    return this.checkStatus(response)
      .then((res) => this.parseJSON(res))
      .catch(this.throwError);
  }

  private getHeaders(contentType: string | undefined): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    return headers;
  }

  private async checkStatus(response: Response): Promise<Response> {
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

  private getUrl(url: string, query: Record<string, unknown> | undefined): string {
    return `${url}${query ? `?${getStringifiedQuery(query)}` : ''}`;
  }

  private parseJSON(response: Response): Promise<unknown> {
    return response.json();
  }

  private throwError(err: Error): never {
    throw err;
  }
}

export { Http };
