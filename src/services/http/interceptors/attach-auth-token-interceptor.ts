import { PreInterceptor } from './interceptor';
import { Headers } from 'node-fetch';
import { CONFIG } from '../../../config/config';

export const attachAuthTokenInterceptor: PreInterceptor = ({ url, options }) => {
  const accessToken = CONFIG.DROPBOX_O2AUTH_TOKEN;
  if (accessToken) {
    (options.headers as Headers).set('Authorization', `Bearer ${accessToken}`);
  }

  return Promise.resolve([url, options]);
};
