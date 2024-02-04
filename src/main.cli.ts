import 'reflect-metadata';
import { Container } from 'inversify';
import { glob } from 'glob';
import { pathToFileURL } from 'node:url';
import {
  CLIApp,
  COMMAND_PATH_TEMPLATE,
  ICommand,
  createCLIAppContainer,
} from './apps/cli/index.js';
import { createUserContainer } from './modules/user/index.js';
import { createOfferContainer } from './modules/offer/index.js';
import { Interface } from './shared/const/index.js';

async function bootstrap() {
  const container = Container.merge(
    createCLIAppContainer(),
    createUserContainer(),
    createOfferContainer(),
  );

  const cliApp = container.get<CLIApp>(Interface.ICLIApp);
  const commandFilePaths = glob.sync(COMMAND_PATH_TEMPLATE);
  const commandInstances: ICommand[] = [];

  for (const filePath of commandFilePaths) {
    const resolvedFilePath = pathToFileURL(filePath);
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const importedModule = await import(resolvedFilePath.pathname);

    Object.keys(importedModule).forEach((name) => {
      const importedItem = importedModule[name];

      if (importedItem.prototype && importedItem.prototype.execute) {
        commandInstances.push(new importedItem());
      }
    });
  }

  cliApp.registerCommands(commandInstances);
  cliApp.proccessCommand(process.argv);
}

bootstrap();
