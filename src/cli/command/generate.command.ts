import got from 'got';
import chalk from 'chalk';
import { appendFile } from 'node:fs/promises';
import { unlink } from 'node:fs';
import { TMockServerData } from "@/mock-server-data.type.js";
import { ICommand } from "./command.interface.js";
import { TSVOfferGenerator } from './lib/index.js';

export class GenerateCommand implements ICommand {
  private readonly _name: string = '--generate';
  private _mockData: TMockServerData;

  private async load(url: string): Promise<void> {
    try {
      this._mockData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(count: number, filePath: string): Promise<void> {
    const tsvOfferGenerator = new TSVOfferGenerator(this._mockData);

    unlink(filePath, (err) => {
      if (!err) {
        console.info(chalk.green(`Previous version of file ${filePath} was deleted!`));
      }
    });

    await appendFile(
      filePath,
      tsvOfferGenerator.generateHeader(),
      { encoding: 'utf8' },
    );

    for (let i = 0; i < count; i++) {
      await appendFile(
        filePath,
        tsvOfferGenerator.generateRecord(),
        { encoding: 'utf8' }
      );
    }
  }

  public get name(): string {
    return this._name;
  }

  public async execute(...params: string[]): Promise<void> {
    const [count, filePath, url] = params;

    try {
      await this.load(url);
      await this.write(Number(count), filePath);
      console.info(chalk.green(`File ${filePath} was created!`));
    } catch (err: unknown) {
      console.error(chalk.green('Can\'t generate data'));

      if (err instanceof Error) {
        console.error(chalk.green(err.message));
      }
    }
  }
}
