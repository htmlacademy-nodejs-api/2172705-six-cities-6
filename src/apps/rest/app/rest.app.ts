import { inject, injectable } from 'inversify';
import { ILogger } from '@/shared/lib/log/index.js';
import { IRESTConfig, IRESTSchema } from '../config/interface/index.js';
import { Interface } from '../const/index.js';

@injectable()
export class RESTApp {
  constructor(
    @inject(Interface.ILogger) private readonly _logger: ILogger,
    @inject(Interface.IRESTConfig) private readonly _config: IRESTConfig<IRESTSchema>
  ) {}

  public init() {
    this._logger.info('Application initialization');
    this._logger.info(`Get value from env $SIX_CITIES_APP_PORT: ${this._config.get('PORT')}`);
    this._logger.info(`Get value from env $SIX_CITIES_APP_SALT: ${this._config.get('SALT')}`);
    this._logger.info(`Get value from env $SIX_CITIES_APP_DB_HOST: ${this._config.get('DB_HOST')}`);
  }
}
