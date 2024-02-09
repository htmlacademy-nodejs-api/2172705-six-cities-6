import { EUserType } from '../const/index.js';

export interface IUser {
  firstname: string;
  email: string;
  type: EUserType;
  avatar: string;
}
