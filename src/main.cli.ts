import 'reflect-metadata';
import { Container } from 'inversify';
import {
  CLIApp,
  HelpCommand,
  ICommand,
  VersionCommand,
  createCLIAppContainer,
} from './apps/cli/index.js';
import { createUserContainer } from './modules/user/index.js';
import { createOfferContainer } from './modules/offer/index.js';
import { ComponentInterface } from './shared/const/index.js';
import { GenerateCommand } from './apps/cli/command/generate.command.js';

async function bootstrap() {
  const container = Container.merge(
    createCLIAppContainer(),
    createUserContainer(),
    createOfferContainer(),
  );

  const cliApp = container.get<CLIApp>(ComponentInterface.ICLIApp);
  const commandInstances: ICommand[] = [
    new HelpCommand(),
    new VersionCommand(),
    new GenerateCommand(),
    container.get<ICommand>(ComponentInterface.IImportCommand),
  ];

  cliApp.registerCommands(commandInstances);
  cliApp.proccessCommand(process.argv);
}

bootstrap();
