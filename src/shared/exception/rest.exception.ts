export class RestException extends Error {
    public message: string;
    public statusCode: number | undefined;
    public errorCode: string;
    public details?: unknown;

    constructor(message: string, errorCode: string, statusCode?: number, details?: unknown) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.details = details;
    }
}
