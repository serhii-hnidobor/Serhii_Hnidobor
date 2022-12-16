import { Http } from './http/http';
import { attachAuthTokenInterceptor } from '../services/http/interceptors/attach-auth-token-interceptor';
import { DropboxApi } from './dropbox-api/dropbox-api';
import { CONFIG } from '../config/config';
import { attachFileUploadHeadersInterceptor } from '../services/http/interceptors/attach-file-upload-headers';
const http = new Http([attachAuthTokenInterceptor, attachFileUploadHeadersInterceptor], []);
const dropboxApi = new DropboxApi({ http, apiPrefix: CONFIG.API_PATH });

export { http, dropboxApi };
