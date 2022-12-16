import { Http } from '../http/http';
import {
  ApiPath,
  ContentType,
  DeleteFile,
  DeleteFileResponse,
  FileApiPath,
  FileMetadataType,
  GetFileMetadataType,
  HttpMethod,
  UploadFilePayload,
  UploadResultType,
} from '../../constants/constants';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class DropboxApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public uploadTestFile({ filePath }: UploadFilePayload): Promise<UploadResultType> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.FILES}${FileApiPath.UPLOAD}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.FILE_UPLOAD,
        payload: JSON.stringify({
          filePath,
        }),
      },
    }) as Promise<UploadResultType>;
  }

  public getFileMetaData({ id }: GetFileMetadataType): Promise<FileMetadataType> {
    return this.#http.load({
      url: `https://api.dropboxapi.com/2${ApiPath.FILES}${FileApiPath.GET_METADATA}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify({
          path: id,
        }),
      },
    }) as Promise<FileMetadataType>;
  }

  public deleteFile({ id }: DeleteFile): Promise<DeleteFileResponse> {
    return this.#http.load({
      url: `https://api.dropboxapi.com/2${ApiPath.FILES}${FileApiPath.DELETE}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify({
          path: id,
        }),
      },
    }) as Promise<DeleteFileResponse>;
  }
}

export { DropboxApi };
