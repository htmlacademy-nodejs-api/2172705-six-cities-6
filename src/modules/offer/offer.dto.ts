import { Facility, HousingType } from '@/shared/const/index.js';
import { TLocation } from '@/shared/types/index.js';

export class OfferDTO {
  public title: string;
  public description: string;
  public date: string;
  public city: string;
  public previewImage: string;
  public imagesList: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public housingType: HousingType;
  public roomsCount: number;
  public guestsCount: number;
  public cost: number;
  public facilities: Facility;
  public authorId: string;
  public location: TLocation;
}
