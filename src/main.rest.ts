import 'reflect-metadata';
import { Container } from 'inversify';
import { RESTApp, createRESTAppContainer } from './apps/rest/index.js';
import { createUserContainer } from './modules/user/index.js';
import { createOfferContainer } from './modules/offer/index.js';
import { createFacilityContainer } from './modules/facility/index.js';
import { createCityContainer } from './modules/city/index.js';
import { EComponentInterface } from './shared/const/index.js';

function bootstrap() {
  const container = Container.merge(
    createRESTAppContainer(),
    createUserContainer(),
    createOfferContainer(),
    createFacilityContainer(),
    createCityContainer(),
  );

  const restApp = container.get<RESTApp>(EComponentInterface.IRESTApp);
  restApp.init();
}

bootstrap();
