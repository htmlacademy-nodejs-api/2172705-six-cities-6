import { inject, injectable } from 'inversify';
import { EComponentInterface } from '../../../shared/const/index.js';
import { getMongoConnectionURL } from '../../../shared/lib/index.js';
import type { ILogger, IDatabaseClient } from '../../../shared/lib/index.js';
import type { IConfig, IRESTSchema } from '../../../shared/config/index.js';

@injectable()
export class RESTApp {
  constructor(
    @inject(EComponentInterface.ILogger) private readonly _logger: ILogger,
    @inject(EComponentInterface.IConfig) private readonly _config: IConfig<IRESTSchema>,
    @inject(EComponentInterface.IDatabaseClient) private readonly _dbClient: IDatabaseClient,
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
