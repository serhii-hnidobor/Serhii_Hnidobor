var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DropboxApi_http, _DropboxApi_apiPrefix;
import { ApiPath, ContentType, FileApiPath, HttpMethod, } from '../../constants/constants';
class DropboxApi {
    constructor({ http, apiPrefix }) {
        _DropboxApi_http.set(this, void 0);
        _DropboxApi_apiPrefix.set(this, void 0);
        __classPrivateFieldSet(this, _DropboxApi_http, http, "f");
        __classPrivateFieldSet(this, _DropboxApi_apiPrefix, apiPrefix, "f");
    }
    uploadTestFile({ filePath }) {
        return __classPrivateFieldGet(this, _DropboxApi_http, "f").load({
            url: `${__classPrivateFieldGet(this, _DropboxApi_apiPrefix, "f")}${ApiPath.FILES}${FileApiPath.UPLOAD}`,
            options: {
                method: HttpMethod.POST,
                contentType: ContentType.FILE_UPLOAD,
                payload: JSON.stringify({
                    filePath,
                }),
            },
        });
    }
    getFileMetaData({ id }) {
        return __classPrivateFieldGet(this, _DropboxApi_http, "f").load({
            url: `https://api.dropboxapi.com/2${ApiPath.FILES}${FileApiPath.GET_METADATA}`,
            options: {
                method: HttpMethod.POST,
                contentType: ContentType.JSON,
                payload: JSON.stringify({
                    path: id,
                }),
            },
        });
    }
    deleteFile({ id }) {
        return __classPrivateFieldGet(this, _DropboxApi_http, "f").load({
            url: `https://api.dropboxapi.com/2${ApiPath.FILES}${FileApiPath.DELETE}`,
            options: {
                method: HttpMethod.POST,
                contentType: ContentType.JSON,
                payload: JSON.stringify({
                    path: id,
                }),
            },
        });
    }
}
_DropboxApi_http = new WeakMap(), _DropboxApi_apiPrefix = new WeakMap();
export { DropboxApi };
