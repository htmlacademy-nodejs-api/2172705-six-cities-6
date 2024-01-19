import { pathToFileURL } from 'node:url';
import { glob } from 'glob';
import { CLIApp, COMMAND_PATH_TEMPLATE, ICommand } from './cli/index.js';

async function bootstrap() {
  const cliApp = new CLIApp();
  const commandFilePaths = glob.sync(COMMAND_PATH_TEMPLATE);
  const commandInstances: ICommand[] = [];

  for (const filePath of commandFilePaths) {
    const resolvedFilePath = pathToFileURL(filePath);
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
