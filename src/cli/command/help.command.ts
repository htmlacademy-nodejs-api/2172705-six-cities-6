import chalk from 'chalk';
import { ICommand } from '../interface/command.interface.js';

export class HelpCommand implements ICommand {
  constructor(private readonly _name: string = '--help') {}

  public get name(): string {
    return this._name;
  }

  public execute(..._params: string[]): void {
    console.info(`
      Программа для подготовки данных для REST API сервера.
      Пример:
          ${chalk.bold.cyan('cli.js --<command> [--arguments]')}
      Команды:
          ${chalk.bold.cyan('--version')}                      # выводит номер версии
          ${chalk.bold.cyan('--help')}                         # печатает этот текст
          ${chalk.bold.cyan('--import <path>')}                # импортирует данные из TSV
          ${chalk.bold.cyan('--generate <n> <path> <url>')}    # генерирует произвольное количество тестовых данных
  `);
  }
}
