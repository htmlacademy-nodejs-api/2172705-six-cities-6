import { Container } from 'inversify';
import {
  ILogger,
  PinoLogger,
  IDatabaseClient,
  MongoDatabaseClient
} from '@/shared/lib/index.js';
import { Interface } from '@/shared/const/index.js';
import {
  IRESTConfig,
  IRESTSchema,
  RESTConfig,
} from '../config/index.js';
import { RESTApp } from './rest.app.js';

export const createRESTAppContainer = () => {
  const container = new Container();

  container.bind<RESTApp>(Interface.IRESTApp).to(RESTApp).inSingletonScope();
  container.bind<ILogger>(Interface.ILogger).to(PinoLogger).inSingletonScope();
  container.bind<IRESTConfig<IRESTSchema>>(Interface.IRESTConfig).to(RESTConfig).inSingletonScope();
  container.bind<IDatabaseClient>(Interface.IDatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  return container;
};
