import { RESTApp, RESTConfig } from './rest/index.js';
import { PinoLogger } from './shared/lib/index.js';

function bootstrap() {
  const logger = new PinoLogger();
  const config = new RESTConfig(logger);
  const restApp = new RESTApp(logger, config);

  restApp.init();
}

bootstrap();
