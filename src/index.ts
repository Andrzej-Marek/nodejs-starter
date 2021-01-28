import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moduleAlias = require("module-alias");
moduleAlias.addAlias("@", __dirname);

import container from "./config/inversify.config";
import { Alias } from "./config/inversify.alias";
import { App } from "./app";

const app = container.get<App>(Alias.App);

app.bootstrap();
