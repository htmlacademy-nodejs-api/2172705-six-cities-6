import { Container } from 'inversify';
import {
  ILogger,
  IDatabaseClient,
  MongoDatabaseClient,
  ConsoleLogger
} from '../../../shared/lib/index.js';
import { Interface } from '../../../shared/const/index.js';
import { CLIApp } from './cli.app.js';
import { ICommand, ImportCommand } from '../index.js';

export const createCLIAppContainer = () => {
  const container = new Container();

  container.bind<CLIApp>(Interface.ICLIApp).to(CLIApp).inSingletonScope();
  container.bind<ILogger>(Interface.ILogger).to(ConsoleLogger).inSingletonScope();
  container.bind<IDatabaseClient>(Interface.IDatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  container.bind<ICommand>(Interface.IImportCommand).to(ImportCommand).inSingletonScope();

  return container;
};
