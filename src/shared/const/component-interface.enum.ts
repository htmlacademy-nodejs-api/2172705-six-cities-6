export const EComponentInterface = {
  ICLIApp: Symbol.for('ICLIApp'),
  IImportCommand: Symbol.for('IImportCommand'),
  IRESTApp: Symbol.for('IRESTApp'),
  IConfig: Symbol.for('IConfig'),
  ILogger: Symbol.for('ILogger'),
  IDatabaseClient: Symbol.for('IDatabaseClient'),
  IUserModel: Symbol.for('IUserModel'),
  IUserService: Symbol.for('IUserService'),
  IOfferModel: Symbol.for('IOfferModel'),
  IOfferService: Symbol.for('IOfferService'),
  IFacilityModel: Symbol.for('IFacilityModel'),
  IFacilityService: Symbol.for('IFacilityService'),
} as const;
