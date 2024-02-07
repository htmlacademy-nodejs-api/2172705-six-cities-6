import convict from 'convict';
import formats from 'convict-format-with-validator';
import { IRESTSchema } from './interface/index.js';

convict.addFormats(formats);

export const restSchema = convict<IRESTSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'SIX_CITIES_APP_PORT',
    default: 4000,
  },
  SALT: {
    doc: 'String for password hash',
    format: String,
    env: 'SIX_CITIES_APP_SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'SIX_CITIES_APP_DB_HOST',
    default: '127.0.0.1',
  }
});
