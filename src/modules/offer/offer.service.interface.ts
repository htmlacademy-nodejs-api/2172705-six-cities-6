import { DocumentType } from '@typegoose/typegoose';
import { OfferDTO } from './offer.dto.js';
import { OfferEntity } from './offer.model.js';

export interface IOfferService {
  create(dto: OfferDTO): Promise<DocumentType<OfferEntity>>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
}
