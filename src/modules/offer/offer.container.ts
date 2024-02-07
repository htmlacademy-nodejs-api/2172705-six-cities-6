import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { ComponentInterface } from '../../shared/const/interface.enum.js';
import { IOfferService } from './offer.service.interface.js';
import { OfferService } from './offer.service.js';
import { OfferEntity, OfferModel } from './offer.model.js';

export const createOfferContainer = () => {
  const container = new Container();

  container.bind<IOfferService>(ComponentInterface.IOfferService).to(OfferService).inSingletonScope();
  container.bind<types.ModelType<OfferEntity>>(ComponentInterface.IOfferModel).toConstantValue(OfferModel);

  return container;
};
