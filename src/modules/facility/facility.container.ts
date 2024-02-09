import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { EComponentInterface } from '../../shared/const/index.js';
import type { IFacilityService } from './facility.service.interface.js';
import { FacilityService } from './facility.service.js';
import { FacilityEntity, FacilityModel } from './facility.model.js';

export const createFacilityContainer = () => {
  const container = new Container();

  container
    .bind<types.ModelType<FacilityEntity>>(EComponentInterface.IFacilityModel)
    .toConstantValue(FacilityModel);

  container
    .bind<IFacilityService>(EComponentInterface.IFacilityService)
    .to(FacilityService)
    .inSingletonScope();

  return container;
};
