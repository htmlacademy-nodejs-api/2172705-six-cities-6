import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { EComponentInterface } from '../const/index.js';
import type { ILogger } from '../lib/index.js';
import type { IConfig, IRESTSchema } from './interfaces/index.js';
import { restSchema } from './rest.schema.js';

@injectable()
export class RESTConfig implements IConfig<IRESTSchema> {
  private readonly _config: IRESTSchema;

  constructor(
    @inject(EComponentInterface.ILogger) private readonly _logger: ILogger
  ) {
    const parsedEnv = config();

    if (parsedEnv.error) {
      const errorMessage = 'Can\'t read .env file. Perhaps the file does not exists';
      this._logger.error(errorMessage, parsedEnv.error);

      throw new Error(errorMessage);
    }

    restSchema.load({});
    restSchema.validate({ allowed: 'strict', output: (message) => this._logger.info(message) });

    this._config = restSchema.getProperties();
    this._logger.info('.env file found and successfully parsed');
  }

  public get<K extends keyof IRESTSchema>(key: K): IRESTSchema[K] {
    return this._config[key];
  }
}
