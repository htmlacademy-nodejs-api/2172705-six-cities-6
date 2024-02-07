import { Container } from 'inversify';
import {
  ILogger,
  PinoLogger,
  IDatabaseClient,
  MongoDatabaseClient
} from '../../../shared/lib/index.js';
import { ComponentInterface } from '../../../shared/const/index.js';
import { RESTConfig } from '../../../shared/config/index.js';
import type { IConfig, IRESTSchema } from '../../../shared/config/index.js';
import { RESTApp } from './rest.app.js';

export const createRESTAppContainer = () => {
  const container = new Container();

  container.bind<RESTApp>(ComponentInterface.IRESTApp).to(RESTApp).inSingletonScope();
  container.bind<ILogger>(ComponentInterface.ILogger).to(PinoLogger).inSingletonScope();
  container.bind<IConfig<IRESTSchema>>(ComponentInterface.IConfig).to(RESTConfig).inSingletonScope();
  container.bind<IDatabaseClient>(ComponentInterface.IDatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  return container;
};
