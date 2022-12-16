import { config } from 'dotenv';
import * as rootPath from 'app-root-path';
interface AppConfig {
  DROPBOX_O2AUTH_TOKEN: string;
  TEST_FILE_PATH: string;
  API_PATH: string;
}

const configuration = (): AppConfig => {
  config({ path: `${rootPath}/.env/.env` });

  const { DROPBOX_O2AUTH_TOKEN } = process.env;

  if (!DROPBOX_O2AUTH_TOKEN) {
    throw 'error dropdown token is empty';
  }

  return {
    DROPBOX_O2AUTH_TOKEN,
    TEST_FILE_PATH: `${rootPath}/test/test-file.txt`,
    API_PATH: 'https://content.dropboxapi.com/2',
  };
};

const CONFIG = configuration();

export { CONFIG };
