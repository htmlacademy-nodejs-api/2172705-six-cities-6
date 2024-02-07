import { EFacility, EHousingType } from '../const/index.js';
import type { TLocation } from '../types/location.type.js';
import type { IUser } from '../interfaces/user.interface.js';

export interface IOffer {
  title: string;
  description: string;
  date: string;
  city: string;
  previewImage: string;
  imagesList: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: EHousingType;
  roomsCount: number;
  guestsCount: number;
  cost: number;
  facilities: EFacility[];
  author: IUser;
  commentsCount: number;
  location: TLocation;
}
