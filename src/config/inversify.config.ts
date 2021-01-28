import { Container } from "inversify";
import { App } from "@/app";
import { Alias } from "./inversify.alias";
import { ConvertRestResponseToCamelCase, CustomErrorHandler } from "@/shared/middleware";
// import { inversifyBindListConfig } from "./inversify-bind-list";

const container = new Container();

container.bind<App>(Alias.App).to(App).inSingletonScope();
container.bind<CustomErrorHandler>(CustomErrorHandler).toSelf().inSingletonScope();
container.bind<ConvertRestResponseToCamelCase>(ConvertRestResponseToCamelCase).toSelf().inSingletonScope();

// inversifyBindListConfig.map(({ component, alias }) => {
//     if (!component) {
//         return;
//     }
//     if (component.toString().includes("Controller")) {
//         // @ts-ignore
//         return container.bind<[typeof component]>(component).toSelf().inSingletonScope();
//     }
//     // @ts-ignore
//     return container.bind<[typeof component]>(alias).to(component).inSingletonScope();
// });

export default container;
