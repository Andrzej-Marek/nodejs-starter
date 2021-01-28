import { Middleware, ExpressErrorMiddlewareInterface } from "routing-controllers";
import { NextFunction } from "express";
import { Injectable } from "../decorator";
import { get, isEmpty } from "lodash";
import { Exception } from "../type/exception-error.type";

@Injectable()
@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: Exception, _request: Request, response: Response, _next: NextFunction): Response {
        const statusCode = get(error, "statusCode", 500);

        // error.errors = array of error fields from class-validator library
        const errors = get(error, "errors", null);

        // error.details = our own application errors
        // for example: error codes from the optimization service
        const errorDetails = get(error, "details", this.cutTargetFromClassValidatorDetails(errors));

        // @ts-ignore
        return response.status(statusCode).json({
            error_code: get(error, "errorCode", null),
            message: error.message,
            details: errorDetails,
        });
    }

    /**
     * class-validator returns the whole sent object + additional information about bad payload
     * for readability, we throw out the sended object and leave only the necessary data
     * @TODO: In the future, please add a mapper which drops all 'target' objects from dto array
     */
    private cutTargetFromClassValidatorDetails(dto: unknown[]): unknown[] | null {
        if (isEmpty(dto)) return null;

        const values = dto.map(classValidatorField => {
            const target = get(classValidatorField, "target", null);
            if (target) {
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { target, ...rest } = classValidatorField;

                return rest;
            }
        });

        return values;
    }
}
