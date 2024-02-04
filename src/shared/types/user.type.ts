import { UserType } from '../const/index.js';

// TODO: сделать интерфейсом
export type TUser = {
  firstname: string;
  email: string;
  type: UserType;
  avatar?: string;
};
