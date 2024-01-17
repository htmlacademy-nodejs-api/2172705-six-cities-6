import { TUser } from './user.type.js';

export type TComment = {
  text: string;
  date: string;
  rating: number;
  author: TUser;
};
