import { inject, injectable } from 'inversify';
import { Interface } from '../../shared/const/index.js';
import type { ILogger } from '../../shared/lib/index.js';
import { IOfferService } from './offer.service.interface.js';
import { OfferDTO } from './offer.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.model.js';

@injectable()
export class OfferService implements IOfferService {
  constructor(
    @inject(Interface.ILogger) private readonly _logger: ILogger,
    @inject(Interface.IOfferModel) private readonly _offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: OfferDTO): Promise<DocumentType<OfferEntity>> {
    const response = await this._offerModel.create(dto);
    this._logger.info(`New offer "${dto.title}" created`);

    return response;
  }

  public findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this._offerModel.findById(id);
  }
}
