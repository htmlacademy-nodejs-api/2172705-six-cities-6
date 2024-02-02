import 'reflect-metadata';
import { Container } from 'inversify';
import {
  IRESTConfig,
  IRESTSchema,
  RESTApp,
  RESTConfig,
} from './apps/rest/index.js';
import {
  ILogger,
  PinoLogger,
  IDatabaseClient,
  MongoDatabaseClient
} from './shared/lib/index.js';
import { Interface } from './shared/const/index.js';

function bootstrap() {
  const container = new Container();
  container.bind<RESTApp>(Interface.IRESTApp).to(RESTApp).inSingletonScope();
  container.bind<ILogger>(Interface.ILogger).to(PinoLogger).inSingletonScope();
  container.bind<IRESTConfig<IRESTSchema>>(Interface.IRESTConfig).to(RESTConfig).inSingletonScope();
  container.bind<IDatabaseClient>(Interface.IDatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  const restApp = container.get<RESTApp>(Interface.IRESTApp);
  restApp.init();
}

bootstrap();
