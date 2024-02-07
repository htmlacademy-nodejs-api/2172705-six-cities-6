import { Container } from 'inversify';
import {
  ILogger,
  IDatabaseClient,
  MongoDatabaseClient,
  ConsoleLogger
} from '../../../shared/lib/index.js';
import { RESTConfig } from '../../../shared/config/index.js';
import type { IConfig, IRESTSchema } from '../../../shared/config/index.js';
import { EComponentInterface } from '../../../shared/const/index.js';
import { ImportCommand } from '../command/index.js';
import type { ICommand } from '../command/index.js';
import { CLIApp } from './cli.app.js';

export const createCLIAppContainer = () => {
  const container = new Container();

  container.bind<CLIApp>(EComponentInterface.ICLIApp).to(CLIApp).inSingletonScope();
  container.bind<ILogger>(EComponentInterface.ILogger).to(ConsoleLogger).inSingletonScope();
  container.bind<IConfig<IRESTSchema>>(EComponentInterface.IConfig).to(RESTConfig).inSingletonScope();
  container.bind<IDatabaseClient>(EComponentInterface.IDatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  container.bind<ICommand>(EComponentInterface.IImportCommand).to(ImportCommand).inSingletonScope();

  return container;
};
