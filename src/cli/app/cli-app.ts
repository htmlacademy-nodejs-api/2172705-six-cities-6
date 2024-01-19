import { ICommand } from '../interface/command.interface.js';
import { CommandParser } from './lib/command-parser.js';

type RegistredCommands = Record<string, ICommand>;

export class CLIApp {
  private _registredCommands: RegistredCommands = {};

  constructor(
    private readonly _defaultCommand: string = '--help'
  ) {}

  private getCommand(name: string): ICommand {
    return this._registredCommands[name] ?? this._registredCommands[this._defaultCommand];
  }

  public registerCommands(commands: ICommand[]): void {
    commands.forEach((command) => {
      if (Object.hasOwn(this._registredCommands, command.name)) {
        throw new Error(`Command ${command.name} is already registered`);
      }

      this._registredCommands[command.name] = command;
    });
  }

  public proccessCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArgs = parsedCommand[commandName] ?? [];
    command.execute(...commandArgs);
  }
}
