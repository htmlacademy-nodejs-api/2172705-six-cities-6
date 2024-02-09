export const getMongoConnectionURL = (
  username: string,
  password: string,
  host: string,
  port: string | number,
  dbName: string,
): string => `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;
