import { inject, injectable } from 'inversify';
import { config } from 'dotenv';
import { ILogger } from '@/shared/lib/index.js';
import { Interface } from '../const/index.js';
import { IRESTConfig } from './rest-config.interface.js';
import { IRESTSchema, restSchema } from './rest.schema.js';

@injectable()
export class RESTConfig implements IRESTConfig<IRESTSchema> {
  private readonly _config: IRESTSchema;

  constructor(
    @inject(Interface.ILogger) private readonly _logger: ILogger
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
