import chalk from 'chalk';
import { ICommand } from '../interface/command.interface.js';

export class HelpCommand implements ICommand {
  private readonly _name: string = '--help';

  public get name(): string {
    return this._name;
  }

  public execute(..._params: string[]): void {
    console.info(`
      Программа для подготовки данных для REST API сервера.
      Пример:
          ${chalk.blue('cli.js --<command> [--arguments]')}
      Команды:
          ${chalk.cyan('--version')}                      ${chalk.magenta('# выводит номер версии')}
          ${chalk.cyan('--help')}                         ${chalk.magenta('# печатает этот текст')}
          ${chalk.cyan('--import <path>')}                ${chalk.magenta('# импортирует данные из TSV')}
  `);
  }
}
