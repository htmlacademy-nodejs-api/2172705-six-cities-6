import { TUserType } from './user-type.type.js';

export type TUser = {
  firstname: string;
  email: string;
  password: string;
  type: TUserType;
  avatar?: string;
};
