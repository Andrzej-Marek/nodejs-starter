import { RestException } from "./rest.exception";

export class UnauthorizedException extends RestException {
    constructor(message: string, errorCode: string) {
        super(message, errorCode, 401);
    }
}
