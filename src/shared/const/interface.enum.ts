export const ComponentInterface = {
  ICLIApp: Symbol.for('ICLIApp'),
  IImportCommand: Symbol.for('IImportCommand'),
  IRESTApp: Symbol.for('IRESTApp'),
  IConfig: Symbol.for('IConfig'),
  ILogger: Symbol.for('ILogger'),
  IDatabaseClient: Symbol.for('IDatabaseClient'),
  IUserService: Symbol.for('IUserService'),
  IUserModel: Symbol.for('IUserModel'),
  IOfferService: Symbol.for('IOfferService'),
  IOfferModel: Symbol.for('IOfferModel'),
} as const;
