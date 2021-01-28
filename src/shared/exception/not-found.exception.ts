import { RestException } from "./rest.exception";

export class NotFoundException extends RestException {
    constructor(message: string, errorCode: string) {
        super(message, errorCode, 404);
    }
}
