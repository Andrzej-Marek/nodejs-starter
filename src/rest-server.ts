import express, { Express } from "express";
import cors from "cors";
import { useContainer, useExpressServer } from "routing-controllers";
import container from "@/config/inversify.config";

const isDev = process.env.NODE_ENV === "dev";
const BUILD_FILE_EXTENSION = isDev ? "ts" : "js";

export class RestServer {
    server: Express;

    constructor() {
        const app: Express = express();
        useContainer(container);

        app.use(express.json());
        // @ts-ignore
        app.use(cors());

        useExpressServer(app, {
            routePrefix: "/api/rest",
            defaultErrorHandler: false,
            controllers: [__dirname + `/user-interface-adapter/**/*.controller.${BUILD_FILE_EXTENSION}`],
            middlewares: [__dirname + `/shared/middleware/*.middleware.${BUILD_FILE_EXTENSION}`],
            cors: true,
            defaults: {
                undefinedResultCode: 204,
            },
        });

        this.server = app;
    }

    listen(port: number): void {
        this.server.listen(port);
    }

    getServer(): Express {
        return this.server;
    }
}
