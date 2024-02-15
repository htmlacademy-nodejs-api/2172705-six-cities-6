import 'reflect-metadata';
import { Container } from 'inversify';
import {
  CLIApp,
  HelpCommand,
  ICommand,
  VersionCommand,
  createCLIAppContainer,
} from './apps/cli/index.js';
import { GenerateCommand } from './apps/cli/command/generate.command.js';
import { createUserContainer } from './modules/user/index.js';
import { createOfferContainer } from './modules/offer/index.js';
import { createFacilityContainer } from './modules/facility/index.js';
import { createCityContainer } from './modules/city/city.container.js';
import { EComponentInterface } from './shared/const/index.js';

async function bootstrap() {
  const container = Container.merge(
    createCLIAppContainer(),
    createUserContainer(),
    createOfferContainer(),
    createFacilityContainer(),
    createCityContainer(),
  );

  const cliApp = container.get<CLIApp>(EComponentInterface.ICLIApp);
  const commandInstances: ICommand[] = [
    new HelpCommand(),
    new VersionCommand(),
    new GenerateCommand(),
    container.get<ICommand>(EComponentInterface.IImportCommand),
  ];

  cliApp.registerCommands(commandInstances);
  cliApp.proccessCommand(process.argv);
}

bootstrap();
