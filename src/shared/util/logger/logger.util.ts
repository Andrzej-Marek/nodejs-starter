import "reflect-metadata";
import { isEmpty } from "lodash";
import { TimeMachine } from "@/shared/util";
import winston, { Logger as WinstonLogger, format } from "winston";
import { Injectable } from "@/shared/decorator";

@Injectable()
export class Logger {
    private readonly logger: WinstonLogger;

    constructor(context: string) {
        const ctx = context.toUpperCase();

        this.logger = winston.createLogger({
            transports: new winston.transports.Console(),

            format: format.combine(
                format.timestamp(),
                format.json(),
                format.colorize({
                    colors: {
                        info: "yellow",
                        error: "red",
                    },
                }),
                format.printf(({ timestamp, level, message, ...rest }) => {
                    const payload = !isEmpty(rest) ? JSON.stringify(rest) : "";
                    const time = TimeMachine.formatDate(timestamp, "DD.MM.YYYY HH:mm:ss");
                    return `[${time}] => ${level} => [${ctx}]: ${message} ${payload}`;
                }),
                format.align()
            ),
        });
    }

    info(msg: string, payload?: unknown): void {
        this.logger.info(msg, payload && JSON.stringify(payload));
    }

    error(msg: string, payload?: unknown): void {
        this.logger.error(msg);
        if (payload) {
            this.logger.error(`Error stack trace:`, payload || "unknown");
        }
    }
}
