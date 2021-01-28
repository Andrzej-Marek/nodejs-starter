import { ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const baseOrmConfig: Partial<ConnectionOptions> = {
    type: "postgres",
    host: process.env.DB_HOST,
    namingStrategy: new SnakeNamingStrategy(),
};

const isDevEnv = process.env.NODE_ENV === "dev";

export const ormConfig = {
    ...baseOrmConfig,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "admin", // @TODO: Remove before deploy to production
    entities: isDevEnv ? ["src/**/*.entity{.ts,.js}"] : ["dist/**/*.entity{.ts,.js}"],
    // TODO: Create migration
    synchronize: false,
    migrationsRun: true,
    migrations: isDevEnv ? ["migrations/**/*{.ts,.js}"] : ["dist/migrations/**/*{.ts,.js}"],
    cli: {
        migrationsDir: isDevEnv ? "migrations" : "dist/migrations",
    },
} as ConnectionOptions;
