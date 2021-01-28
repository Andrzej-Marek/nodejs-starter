import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import { Injectable } from "../decorator";
import { snakeCaseConverter } from "../converter";

@Injectable()
@Middleware({ type: "before" })
export class ConvertRestResponseToCamelCase implements ExpressMiddlewareInterface {
    use(_request: Request, response: Response, next: NextFunction): void {
        const performSend = response.send;

        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        response.send = body => {
            if (typeof body === "object" && body !== null) {
                body = snakeCaseConverter(body);
            }
            performSend.call(response, body);
        };
        next();
    }
}
