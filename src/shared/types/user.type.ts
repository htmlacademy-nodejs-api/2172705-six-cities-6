import { UserType } from '../const/user-type.enum.js';

export type TUser = {
  firstname: string;
  email: string;
  password: string;
  type: UserType;
  avatar?: string;
};
