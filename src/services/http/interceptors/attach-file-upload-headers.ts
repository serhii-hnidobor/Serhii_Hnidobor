import { PreInterceptor } from './interceptor';
import { Headers } from 'node-fetch';

export const attachFileUploadHeadersInterceptor: PreInterceptor = ({ url, options }) => {
  const { body } = options;

  const { filePath } = JSON.parse(body as string);

  if (filePath && body) {
    (options.headers as Headers).set(
      'Dropbox-API-Arg',
      JSON.stringify({
        'path': filePath,
        'mode': 'overwrite',
        'autorename': true,
        'mute': false,
        'strict_conflict': false,
      }),
    );
  }
  return Promise.resolve([url, options]);
};
