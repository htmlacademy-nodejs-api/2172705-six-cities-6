import chalk from 'chalk';
import { getErrorMessage } from '@/shared/lib/index.js';
import { TSVFileReader, createOffer } from './lib/index.js';
import { ICommand } from './command.interface.js';

export class ImportCommand implements ICommand {
  private readonly _name: string = '--import';

  private onRecordImport(record: string): void {
    const createdOffer = createOffer(record);
    console.log(createdOffer);
  }

  private onImportComplete(count: number): void {
    console.info(`${count} records imported.`);
  }

  public get name(): string {
    return this._name;
  }

  public async execute(...params: string[]): Promise<void> {
    const [filePath] = params;
    const tsvReader = new TSVFileReader(filePath);
    tsvReader.on('readed', this.onRecordImport);
    tsvReader.on('end', this.onImportComplete);

    try {
      await tsvReader.read();
    } catch (err: unknown) {
      console.error(chalk.red(`Can't import data from file: ${filePath}`));
      console.error(chalk.red(getErrorMessage(err)));
    }
  }
}
