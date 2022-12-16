import { HttpCode } from '../../enums/enums';
const DEFAULT_SERVER_ERROR = 'Network Error';
class HttpError extends Error {
    constructor({ message = DEFAULT_SERVER_ERROR, status = HttpCode.INTERNAL_SERVER_ERROR, errorCode, } = {}) {
        super(message);
        this.status = status;
        this.message = message;
        this.errorCode = errorCode;
    }
}
export { HttpError };
