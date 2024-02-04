// TODO: изменить везде нейминг на ComponentInterface
export const Interface = {
  IRESTApp: Symbol.for('IRESTApp'),
  ICLIApp: Symbol.for('ICLIApp'),
  IRESTConfig: Symbol.for('IRESTConfig'),
  ILogger: Symbol.for('ILogger'),
  IDatabaseClient: Symbol.for('IDatabaseClient'),
  IUserService: Symbol.for('IUserService'),
  IUserModel: Symbol.for('IUserModel'),
  IOfferService: Symbol.for('IOfferService'),
  IOfferModel: Symbol.for('IOfferModel'),
} as const;
