import { EFacility, EHousingType } from '../../shared/const/index.js';
import type { TLocation } from '../../shared/types/index.js';

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
  public housingType: EHousingType;
  public roomsCount: number;
  public guestsCount: number;
  public cost: number;
  public facilities: EFacility[];
  public authorId: string;
  public location: TLocation;
}
