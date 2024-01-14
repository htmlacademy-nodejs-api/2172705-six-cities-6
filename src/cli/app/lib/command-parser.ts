type ParsedCommands = Record<string, string[]>;

export class CommandParser {
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
}
