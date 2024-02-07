import type { IUser } from '../interfaces/user.interface.js';

export type TComment = {
  text: string;
  date: string;
  rating: number;
  author: IUser;
};
