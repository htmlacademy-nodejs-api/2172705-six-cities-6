import convict from 'convict';
import formats from 'convict-format-with-validator';
import type { IRESTSchema } from './interfaces/index.js';

convict.addFormats(formats);

export const restSchema = convict<IRESTSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'SIX_CITIES_PORT',
    default: 4000,
  },
  SALT: {
    doc: 'String for password hash',
    format: String,
    env: 'SIX_CITIES_SALT',
    default: null,
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: 'SIX_CITIES_DB_NAME',
    default: null,
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'SIX_CITIES_DB_HOST',
    default: '127.0.0.1',
  },
  DB_PORT: {
    doc: 'Port to connect to the database (MongoDB)',
    format: 'port',
    env: 'SIX_CITIES_DB_PORT',
    default: 27017,
  },
  DB_USERNAME: {
    doc: 'Username to connect to the database (MongoDB)',
    format: String,
    env: 'SIX_CITIES_DB_USERNAME',
    default: '127.0.0.1',
  },
  DB_PASSWORD: {
    doc: 'Password to connect to the database (MongoDB)',
    format: String,
    env: 'SIX_CITIES_DB_PASSWORD',
    default: null,
  }
});
