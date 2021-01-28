import { createConnection } from "typeorm";
import { ormConfig } from "./config";
import { Logger } from "./shared/util";
import { Injectable } from "./shared/decorator";
import { RestServer } from "./rest-server";

@Injectable()
export class App {
    logger: Logger;

    constructor() {
        this.logger = new Logger("Kernel");
    }

    async bootstrap(): Promise<void> {
        await this.dbConnection();
        const server = new RestServer();
        const PORT = Number(process.env.PORT) || 3000;

        server.listen(PORT);

        this.logger.info(`App is running on port ${PORT}`);
    }

    private async dbConnection(): Promise<void> {
        try {
            await createConnection(ormConfig);
            this.logger.info("Connected to the db");
        } catch (error) {
            this.logger.error("Failed to connect to the db", error);
            throw new Error("Failed to connect to the db");
        }
    }
}
