import { ILogger } from '@/shared/lib/log/index.js';

export class RESTApp {
  constructor(
    private readonly _logger: ILogger
  ) {}

  public init() {
    this._logger.info('Application initialization');
  }
}
