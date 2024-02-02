import { inject, injectable } from 'inversify';
import { Interface } from '@/shared/const/index.js';
import { ILogger, IDatabaseClient, getMongoConnectionURL } from '@/shared/lib/index.js';
import { IRESTConfig, IRESTSchema } from '../config/interface/index.js';

@injectable()
export class RESTApp {
  constructor(
    @inject(Interface.ILogger) private readonly _logger: ILogger,
    @inject(Interface.IRESTConfig) private readonly _config: IRESTConfig<IRESTSchema>,
    @inject(Interface.IDatabaseClient) private readonly _dbClient: IDatabaseClient,
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
