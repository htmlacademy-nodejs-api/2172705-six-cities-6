import { RESTApp } from './rest/app/rest.app.js';
import { PinoLogger } from './shared/lib/index.js';

function bootstrap() {
  const logger = new PinoLogger();
  const restApp = new RESTApp(logger);

  restApp.init();
}

bootstrap();
