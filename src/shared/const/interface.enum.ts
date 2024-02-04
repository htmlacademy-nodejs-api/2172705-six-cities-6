// TODO: изменить везде нейминг на ComponentInterface
export const Interface = {
  ICLIApp: Symbol.for('ICLIApp'),
  IImportCommand: Symbol.for('IImportCommand'),
  IRESTApp: Symbol.for('IRESTApp'),
  IRESTConfig: Symbol.for('IRESTConfig'),
  ILogger: Symbol.for('ILogger'),
  IDatabaseClient: Symbol.for('IDatabaseClient'),
  IUserService: Symbol.for('IUserService'),
  IUserModel: Symbol.for('IUserModel'),
  IOfferService: Symbol.for('IOfferService'),
  IOfferModel: Symbol.for('IOfferModel'),
} as const;
