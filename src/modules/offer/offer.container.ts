import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Interface } from '../../shared/const/interface.enum.js';
import { IOfferService } from './offer.service.interface.js';
import { OfferService } from './offer.service.js';
import { OfferEntity, OfferModel } from './offer.model.js';

export const createOfferContainer = () => {
  const container = new Container();

  container.bind<IOfferService>(Interface.IOfferService).to(OfferService).inSingletonScope();
  container.bind<types.ModelType<OfferEntity>>(Interface.IOfferModel).toConstantValue(OfferModel);

  return container;
};
