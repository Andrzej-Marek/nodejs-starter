import { RestException } from "./rest.exception";

export class ForbiddenException extends RestException {
    constructor(message: string, errorCode: string) {
        super(message, errorCode, 403);
    }
}
