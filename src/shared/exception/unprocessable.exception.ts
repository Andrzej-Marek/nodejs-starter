import { RestException } from "./rest.exception";

export class UnprocessableException extends RestException {
    constructor(message: string, errorCode: string) {
        super(message, errorCode, 422);
    }
}
