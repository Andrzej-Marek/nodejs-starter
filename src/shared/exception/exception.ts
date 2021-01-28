export class Exception extends Error {
    message: string;
    errorCode: string;
    details?: unknown;

    constructor(message: string, errorCode: string, details?: unknown) {
        super();
        Error.captureStackTrace(this, this.constructor);

        this.message = message;
        this.errorCode = errorCode;
        this.details = details;
    }
}
