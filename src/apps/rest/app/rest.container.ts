import { Container } from 'inversify';
import {
  ILogger,
  PinoLogger,
  IDatabaseClient,
  MongoDatabaseClient,
} from '../../../shared/lib/index.js';
import { EComponentInterface } from '../../../shared/const/index.js';
import { RESTConfig } from '../../../shared/config/index.js';
import type { IConfig, IRESTSchema } from '../../../shared/config/index.js';
import { RESTApp } from './rest.app.js';

export const createRESTAppContainer = () => {
  const container = new Container();

  container
    .bind<RESTApp>(EComponentInterface.IRESTApp)
    .to(RESTApp)
    .inSingletonScope();

  container
    .bind<IDatabaseClient>(EComponentInterface.IDatabaseClient)
    .to(MongoDatabaseClient)
    .inSingletonScope();

  container
    .bind<ILogger>(EComponentInterface.ILogger)
    .to(PinoLogger)
    .inSingletonScope();

  container
    .bind<IConfig<IRESTSchema>>(EComponentInterface.IConfig)
    .to(RESTConfig)
    .inSingletonScope();

  return container;
};
