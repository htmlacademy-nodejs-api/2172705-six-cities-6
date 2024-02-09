import { Facility, HousingType } from '../const/index.js';
import { TLocation } from './location.type.js';
import { TUser } from './user.type.js';

export type TOffer = {
  title: string;
  description: string;
  date: string;
  city: string;
  previewImage: string;
  imagesList: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomsCount: number;
  guestsCount: number;
  cost: number;
  facilities: Facility[];
  author: TUser;
  location: TLocation;
  commentsCount: number;
};
