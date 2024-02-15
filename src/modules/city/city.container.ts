import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { EComponentInterface } from '../../shared/const/index.js';
import type { ICityService } from './city.service.interface.js';
import { CityService } from './city.service.js';
import { CityEntity, CityModel } from './city.model.js';

export const createCityContainer = () => {
  const container = new Container();

  container
    .bind<types.ModelType<CityEntity>>(EComponentInterface.ICityModel)
    .toConstantValue(CityModel);

  container
    .bind<ICityService>(EComponentInterface.ICityService)
    .to(CityService)
    .inSingletonScope();

  return container;
};
