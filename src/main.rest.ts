import 'reflect-metadata';
import { Container } from 'inversify';
import { RESTApp, createRESTAppContainer } from './apps/rest/index.js';
import { createOfferContainer } from './modules/offer/offer.container.js';
import { createUserContainer } from './modules/user/index.js';
import { Interface } from './shared/const/index.js';

function bootstrap() {
  const container = Container.merge(
    createRESTAppContainer(),
    createUserContainer(),
    createOfferContainer(),
  );

  const restApp = container.get<RESTApp>(Interface.IRESTApp);
  restApp.init();
}

bootstrap();
