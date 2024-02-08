import { injectable } from 'inversify';
import { Logger as PinoInstance, pino, transport } from 'pino';
import { resolve } from 'node:path';
import { getCurrentModuleDirPath } from '../file-system/index.js';
import { ILogger } from './logger.interface.js';

@injectable()
export class PinoLogger implements ILogger {
  private readonly _logger: PinoInstance;

  constructor() {
    const moduleDirPath = getCurrentModuleDirPath(import.meta.url);
    const logFilePath = 'logs/rest.log';
    const destination = resolve(moduleDirPath, '../../../../', logFilePath);

    const fileTransport = transport({
      targets: [
        {
          target: 'pino/file',
          level: 'debug',
          options: {
            destination,
          },
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {},
        },

      ],
    });

    this._logger = pino({}, fileTransport);
    this._logger.info('Logger was created');
  }

  public info(message: string, ...args: unknown[]): void {
    this._logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this._logger.warn(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this._logger.error(error, message, ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    this._logger.debug(message, ...args);
  }
}
