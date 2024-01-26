import 'reflect-metadata';
import { Container } from 'inversify';
import {
  IRESTConfig,
  IRESTSchema,
  Interface,
  RESTApp,
  RESTConfig,
} from './rest/index.js';
import { ILogger, PinoLogger } from './shared/lib/index.js';

function bootstrap() {
  const container = new Container();
  container.bind<RESTApp>(Interface.IRESTApp).to(RESTApp).inSingletonScope();
  container.bind<ILogger>(Interface.ILogger).to(PinoLogger).inSingletonScope();
  container.bind<IRESTConfig<IRESTSchema>>(Interface.IRESTConfig).to(RESTConfig).inSingletonScope();

  const restApp = container.get<RESTApp>(Interface.IRESTApp);
  restApp.init();
}

bootstrap();
