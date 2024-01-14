import chalk from 'chalk';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ICommand } from '../interface/command.interface.js';

type TPackageJSONConfig = {
  version: string;
};

const isPackageJSONConfig = (content: unknown): content is TPackageJSONConfig =>
  typeof content === 'object' &&
  content !== null &&
  !Array.isArray(content) &&
  Object.hasOwn(content, 'version');

export class VersionCommand implements ICommand {
  constructor(
    private readonly _name: string = '--version',
    private readonly _filePath: string = './package.json',
  ) {}

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this._filePath), { encoding: 'utf-8' });
    const parsedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(parsedContent)) {
      throw new Error('Failed to parse json content.');
    }

    return parsedContent.version;
  }

  public get name(): string {
    return this._name;
  }

  public async execute(..._params: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(chalk.bold.green(version));
    } catch (err) {
      console.error(chalk.red(`Failed to read version from ${this._filePath}`));

      if (err instanceof Error) {
        console.error(chalk.red(err.message));
      }
    }
  }
}
