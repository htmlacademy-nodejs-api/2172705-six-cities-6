import { injectable } from 'inversify';
import { getErrorMessage } from '../error/index.js';
import { ILogger } from './logger.interface.js';

@injectable()
export class ConsoleLogger implements ILogger {
  private readonly _logger: Console = console;

  public info(message: string, ...args: unknown[]): void {
    this._logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this._logger.warn(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this._logger.error(message, ...args);
    this._logger.error(`Error message: ${getErrorMessage(error)}`);
  }

  public debug(message: string, ...args: unknown[]): void {
    this._logger.debug(message, ...args);
  }
}
