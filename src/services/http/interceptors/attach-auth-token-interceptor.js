import { CONFIG } from '../../../config/config';
export const attachAuthTokenInterceptor = ({ url, options }) => {
    const accessToken = CONFIG.DROPBOX_O2AUTH_TOKEN;
    if (accessToken) {
        options.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return Promise.resolve([url, options]);
};
