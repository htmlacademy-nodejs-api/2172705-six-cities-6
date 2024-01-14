import { TCoordinates } from './coordinates.type.js';
import { FacilitiesType } from '../const/facilities-type.enum.js';
import { HousingType } from '../const/housing-type.enum.js';
import { TImage } from './image.type.js';
import { TUser } from './user.type.js';

export type TOffer = {
  title: string;
  description: string;
  date: string;
  city: string;
  previewImage: TImage;
  imagesList: TImage[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomsCount: number;
  guestsCount: number;
  cost: number;
  facilities: FacilitiesType[];
  author: TUser;
  commentsCount: number;
  coordinates: TCoordinates;
};
