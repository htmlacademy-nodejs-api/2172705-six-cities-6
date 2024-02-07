import { TLocation } from './location.type.js';
import { TFacilities } from './facilities.type.js';
import { TUser } from './user.type.js';
import { THousingType } from './housing-type.type.js';

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
  housingType: THousingType;
  roomsCount: number;
  guestsCount: number;
  cost: number;
  facilities: TFacilities[];
  author: TUser;
  commentsCount: number;
  location: TLocation;
};
