import { dropboxApi } from './services/services';
import { CONFIG } from './config/config';
import 'jasmine';
// const main = async (): Promise<any> => {
//   const filePath = CONFIG.TEST_FILE_PATH;
//
//   const { id } = await dropboxApi.uploadTestFile({ filePath });
//
//   console.log(id);
//
//   const res1 = await dropboxApi.getFileMetaData({ id });
//
//   const res = await dropboxApi.deleteFile({ id });
//
//   console.log(res);
//   console.log(res1);
// };
//main();
let uploadedFileId;
describe('dropbox api tests', () => {
    it('upload file should work', async () => {
        const filePath = CONFIG.TEST_FILE_PATH;
        const { id } = await dropboxApi.uploadTestFile({ filePath });
        uploadedFileId = id;
        expect(id).toBe(jasmine.any(String));
    });
    it('get file metadata should work', async () => {
        const fileMetadata = await dropboxApi.getFileMetaData({ id: uploadedFileId });
        const { id } = fileMetadata;
        expect(id).toEqual(uploadedFileId);
    });
    it('get file metadata should work', async () => {
        const response = await dropboxApi.deleteFile({ id: uploadedFileId });
        const { id } = response.metadata;
        expect(id).toEqual(uploadedFileId);
    });
});
