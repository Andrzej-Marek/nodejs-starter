import { RestException } from "./rest.exception";

export class BadRequestException extends RestException {
    constructor(message: string, errorCode: string) {
        super(message, errorCode, 400);
    }
}
