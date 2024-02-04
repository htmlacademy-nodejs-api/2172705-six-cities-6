// TODO: изменить везде нейминг на ComponentInterface
export const Interface = {
  IRESTApp: Symbol.for('IRESTApp'),
  IRESTConfig: Symbol.for('IRESTConfig'),
  ILogger: Symbol.for('ILogger'),
  IDatabaseClient: Symbol.for('IDatabaseClient'),
  IUserService: Symbol.for('IUserService'),
  IUserModel: Symbol.for('IUserModel'),
} as const;
