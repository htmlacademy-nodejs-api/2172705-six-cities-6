import { ICommandParser } from './command-parser.interface.js';
import { ParsedCommands } from './parsed-commands.type.js';

export const CommandParser: ICommandParser = class {
  public static parse(argv: string[]): ParsedCommands {
    const parsedCommand: ParsedCommands = {};
    let currentCommand = '';

    argv.forEach((arg) => {
      if (arg.startsWith('--')) {
        parsedCommand[arg] = [];
        currentCommand = arg;
      } else if (arg && currentCommand) {
        parsedCommand[currentCommand].push(arg);
      }
    });

    return parsedCommand;
  }
};
