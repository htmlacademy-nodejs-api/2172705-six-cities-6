import { inject, injectable } from 'inversify';
import { EComponentInterface } from '../../shared/const/index.js';
import type { ILogger } from '../../shared/lib/index.js';
import { IOfferService } from './offer.service.interface.js';
import { OfferDTO } from './offer.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.model.js';

@injectable()
export class OfferService implements IOfferService {
  constructor(
    @inject(EComponentInterface.ILogger) private readonly _logger: ILogger,
    @inject(EComponentInterface.IOfferModel) private readonly _offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: OfferDTO): Promise<DocumentType<OfferEntity>> {
    const response = await this._offerModel.create(dto);
    this._logger.info(`New offer "${dto.title}" was created`);

    return response;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this._offerModel.findById(id);
  }
}
