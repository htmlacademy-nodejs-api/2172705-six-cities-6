export interface ICommand {
  get name(): string;
  execute(...params: string[]): void;
}
