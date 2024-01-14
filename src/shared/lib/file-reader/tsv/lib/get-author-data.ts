import { UserType } from '../../../../const/user-type.enum.js';
import { TUser } from '../../../../types/user.type.js';

export const getAuthorData = (data: string): TUser => {
  const parsedData = data.split(';');
  const [firstname, email, avatar, password] = parsedData;
  const type = UserType[parsedData.at(-1) as UserType];

  return { firstname, email, avatar, password, type };
};
