import chalk from 'chalk';
import { TSVFileReader } from '../../shared/lib/index.js';
import { ICommand } from '../interface/command.interface.js';

export class ImportCommand implements ICommand {
  private readonly _name: string = '--import';

  public get name(): string {
    return this._name;
  }

  public execute(...params: string[]): void {
    const [filePath] = params;
    const tsvReader = new TSVFileReader(filePath);

    try {
      tsvReader.read();
      console.log(tsvReader.toArray());
    } catch (err) {
      console.error(chalk.red(`Can't import data from file: ${filePath}`));

      if (err instanceof Error) {
        console.error(chalk.red(`Details: ${err.message}`));
      }
    }
  }
}
