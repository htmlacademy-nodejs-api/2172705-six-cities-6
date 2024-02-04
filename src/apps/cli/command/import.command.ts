import chalk from 'chalk';
import { inject } from 'inversify';
import { ILogger, getErrorMessage, IDatabaseClient, getMongoConnectionURL } from '@/shared/lib/index.js';
import { TOffer } from '@/shared/types/index.js';
import { Interface } from '@/shared/const/interface.enum.js';
import { IUserService } from '@/modules/user/user.service.interface.js';
import { IOfferService } from '@/modules/offer/offer.service.interface.js';
import { TSVFileReader, createOffer } from './lib/index.js';
import { ICommand } from './command.interface.js';

export class ImportCommand implements ICommand {
  private readonly _name: string = '--import';

  constructor(
    @inject(Interface.ILogger) private readonly _logger: ILogger,
    @inject(Interface.IDatabaseClient) private readonly _dbClient: IDatabaseClient,
    @inject(Interface.IUserService) private readonly _userService: IUserService,
    @inject(Interface.IOfferService) private readonly _offerService: IOfferService,
  ) {}

  private async saveOffer(offer: TOffer): Promise<void> {
    const user = await this._userService.findOrCreate(
      { ...offer.author, password: '123456' },
      'qwert',
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

  private async onRecordImport(record: string, resolve: () => void): Promise<void> {
    const offer = createOffer(record);
    await this.saveOffer(offer);
    resolve();
  }

  // TODO: у всех приватных методов добавить "_"
  private onImportComplete(count: number): void {
    this._logger.info(`${count} records imported.`);
    this._dbClient.disconnect();
  }

  public get name(): string {
    return this._name;
  }

  public async execute(...params: string[]): Promise<void> {
    const [filePath, login, password, host, dbName] = params;

    const mongoConnectionUrl = getMongoConnectionURL(login, password, host, 27017, dbName);
    this._dbClient.connect(mongoConnectionUrl);

    const tsvReader = new TSVFileReader(filePath);
    tsvReader.on('readed', this.onRecordImport);
    tsvReader.on('end', this.onImportComplete);

    try {
      await tsvReader.read();
    } catch (err: unknown) {
      console.error(chalk.red(`Can't import data from file: ${filePath}`));
      console.error(chalk.red(getErrorMessage(err)));
    }
  }
}
