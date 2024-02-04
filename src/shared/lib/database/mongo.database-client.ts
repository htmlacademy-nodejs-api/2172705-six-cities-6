import { inject, injectable } from 'inversify';
import * as Mongoose from 'mongoose';
import { setTimeout } from 'node:timers/promises';
import { Interface } from '../../const/index.js';
import type { ILogger } from '../log/index.js';
import { IDatabaseClient } from './database-client.interface.js';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export class MongoDatabaseClient implements IDatabaseClient {
  private _mongoose: typeof Mongoose;
  private _isConnected: boolean = false;

  constructor(@inject(Interface.ILogger) private readonly _logger: ILogger) {}

  public async connect(uri: string, options?: Mongoose.ConnectOptions): Promise<void> {
    if (this._isConnected) {
      throw new Error('MongoDB client is already connected');
    }

    let retryNumber = 0;

    while (retryNumber < RETRY_COUNT) {
      try {
        this._logger.info('Trying to connect to MongoDB');
        this._mongoose = await Mongoose.connect(uri, options);
        this._isConnected = true;
        this._logger.info('Database connection established');

        return;
      } catch (err) {
        retryNumber++;
        this._logger.error(`Failed to connect to the database. Attempt ${retryNumber}`, err as Error);
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    const error = new Error(`Unable to establish database connection after ${RETRY_COUNT}`);
    this._logger.error(error.message, error);
    throw error;
  }

  public async disconnect(): Promise<void> {
    if (!this._isConnected) {
      throw new Error('MongoDB client is already disconnected');
    }

    try {
      await this._mongoose.disconnect();
      this._isConnected = false;
      this._logger.info('Database connection closed');
    } catch (err: unknown) {
      if (err instanceof Error) {
        this._logger.error('Failed to disconnect to MongoDB', err);
        return Promise.reject();
      }

      throw new Error('Failed to disconnect to MongoDB');
    }
  }
}
