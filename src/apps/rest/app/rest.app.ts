import { inject, injectable } from 'inversify';
import { ComponentInterface } from '../../../shared/const/index.js';
import { getMongoConnectionURL } from '../../../shared/lib/index.js';
import type { ILogger, IDatabaseClient } from '../../../shared/lib/index.js';
import type { IRESTConfig, IRESTSchema } from '../config/interfaces/index.js';

@injectable()
export class RESTApp {
  constructor(
    @inject(ComponentInterface.ILogger) private readonly _logger: ILogger,
    @inject(ComponentInterface.IRESTConfig) private readonly _config: IRESTConfig<IRESTSchema>,
    @inject(ComponentInterface.IDatabaseClient) private readonly _dbClient: IDatabaseClient,
  ) {}

  private async _initDb(): Promise<void> {
    const mongoConnectionURL = getMongoConnectionURL(
      this._config.get('DB_USERNAME'),
      this._config.get('DB_PASSWORD'),
      this._config.get('DB_HOST'),
      this._config.get('DB_PORT'),
      this._config.get('DB_NAME'),
    );

    return this._dbClient.connect(mongoConnectionURL);
  }

  public async init(): Promise<void> {
    this._logger.info('Application initialization');
    this._logger.info('Database initialization');
    await this._initDb();
    this._logger.info('Successful database initialization');
  }
}
