import { Container } from 'inversify';
import {
  ILogger,
  IDatabaseClient,
  MongoDatabaseClient,
  ConsoleLogger
} from '../../../shared/lib/index.js';
import { ComponentInterface } from '../../../shared/const/index.js';
import { CLIApp } from './cli.app.js';
import { ICommand, ImportCommand } from '../index.js';

export const createCLIAppContainer = () => {
  const container = new Container();

  container.bind<CLIApp>(ComponentInterface.ICLIApp).to(CLIApp).inSingletonScope();
  container.bind<ILogger>(ComponentInterface.ILogger).to(ConsoleLogger).inSingletonScope();
  container.bind<IDatabaseClient>(ComponentInterface.IDatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  container.bind<ICommand>(ComponentInterface.IImportCommand).to(ImportCommand).inSingletonScope();

  return container;
};
