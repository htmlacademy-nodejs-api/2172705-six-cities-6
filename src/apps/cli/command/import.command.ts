import chalk from 'chalk';
import { inject, injectable } from 'inversify';
import { getErrorMessage, getMongoConnectionURL } from '../../../shared/lib/index.js';
import type { IDatabaseClient, ILogger } from '../../../shared/lib/index.js';
import type { IOffer } from '../../../shared/interfaces/index.js';
import { ComponentInterface } from '../../../shared/const/index.js';
import type { IUserService } from '../../../modules/user/index.js';
import type { IOfferService } from '../../../modules/offer/index.js';
import { TSVFileReader, createOffer } from './lib/index.js';
import { ICommand } from './command.interface.js';

const MOCK_PASSWORD = '123456';
const MOCK_SALT = 'mockSalt';

@injectable()
export class ImportCommand implements ICommand {
  private readonly _name: string = '--import';

  constructor(
    @inject(ComponentInterface.ILogger) private readonly _logger: ILogger,
    @inject(ComponentInterface.IDatabaseClient) private readonly _dbClient: IDatabaseClient,
    @inject(ComponentInterface.IUserService) private readonly _userService: IUserService,
    @inject(ComponentInterface.IOfferService) private readonly _offerService: IOfferService,
  ) {
    this._onRecordImport = this._onRecordImport.bind(this);
    this._onImportComplete = this._onImportComplete.bind(this);
  }

  private async _saveOffer(offer: IOffer): Promise<void> {
    const user = await this._userService.findOrCreate(
      { ...offer.author, password: MOCK_PASSWORD },
      MOCK_SALT
    );

    await this._offerService.create({
      title: offer.title,
      description: offer.description,
      date: offer.date,
      city: offer.city,
      previewImage: offer.previewImage,
      imagesList: offer.imagesList,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      housingType: offer.housingType,
      roomsCount: offer.roomsCount,
      guestsCount: offer.guestsCount,
      cost: offer.cost,
      facilities: offer.facilities,
      authorId: user.id,
      location: offer.location
    });
  }

  private async _onRecordImport(record: string, resolve: () => void): Promise<void> {
    const offer = createOffer(record);
    await this._saveOffer(offer);
    resolve();
  }

  private _onImportComplete(count: number): void {
    this._logger.info(`${count} records imported.`);
    this._dbClient.disconnect();
  }

  public get name(): string {
    return this._name;
  }

  public async execute(...params: string[]): Promise<void> {
    const [filePath, login, password, host, port, dbName] = params;

    const mongoConnectionUrl = getMongoConnectionURL(login, password, host, port, dbName);
    await this._dbClient.connect(mongoConnectionUrl);

    const tsvReader = new TSVFileReader(filePath);
    tsvReader.on('readed', this._onRecordImport);
    tsvReader.on('end', this._onImportComplete);

    try {
      await tsvReader.read();
    } catch (err: unknown) {
      console.error(chalk.red(`Can't import data from file: ${filePath}`));
      console.error(chalk.red(getErrorMessage(err)));
    }
  }
}
