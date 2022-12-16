import { config } from 'dotenv';
import * as rootPath from 'app-root-path';
const configuration = () => {
    config({ path: `${rootPath}/.env/.env` });
    const { DROPBOX_O2AUTH_TOKEN } = process.env;
    if (!DROPBOX_O2AUTH_TOKEN) {
        throw 'error dropdown token is empty';
    }
    return {
        DROPBOX_O2AUTH_TOKEN,
        TEST_FILE_PATH: `test/test-file.txt`,
        API_PATH: 'https://content.dropboxapi.com/2',
    };
};
const CONFIG = configuration();
export { CONFIG };
