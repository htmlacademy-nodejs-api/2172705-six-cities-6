import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { EComponentInterface } from '../../shared/const/index.js';
import { IOfferService } from './offer.service.interface.js';
import { OfferService } from './offer.service.js';
import { OfferEntity, OfferModel } from './offer.model.js';

export const createOfferContainer = () => {
  const container = new Container();

  container.bind<IOfferService>(EComponentInterface.IOfferService).to(OfferService).inSingletonScope();
  container.bind<types.ModelType<OfferEntity>>(EComponentInterface.IOfferModel).toConstantValue(OfferModel);

  return container;
};
