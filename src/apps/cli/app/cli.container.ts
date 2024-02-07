import { Container } from 'inversify';
import {
  ILogger,
  IDatabaseClient,
  MongoDatabaseClient,
  ConsoleLogger
} from '../../../shared/lib/index.js';
import { RESTConfig } from '../../../shared/config/index.js';
import type { IConfig, IRESTSchema } from '../../../shared/config/index.js';
import { ComponentInterface } from '../../../shared/const/index.js';
import { ImportCommand } from '../command/index.js';
import type { ICommand } from '../command/index.js';
import { CLIApp } from './cli.app.js';

export const createCLIAppContainer = () => {
  const container = new Container();

  container.bind<CLIApp>(ComponentInterface.ICLIApp).to(CLIApp).inSingletonScope();
  container.bind<ILogger>(ComponentInterface.ILogger).to(ConsoleLogger).inSingletonScope();
  container.bind<IConfig<IRESTSchema>>(ComponentInterface.IConfig).to(RESTConfig).inSingletonScope();
  container.bind<IDatabaseClient>(ComponentInterface.IDatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  container.bind<ICommand>(ComponentInterface.IImportCommand).to(ImportCommand).inSingletonScope();

  return container;
};
