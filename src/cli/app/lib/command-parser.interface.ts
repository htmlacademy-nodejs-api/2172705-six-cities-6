import { ParsedCommands } from "./parsed-commands.type.js";

export interface ICommandParser {
  parse(argv: string[]): ParsedCommands;
}
