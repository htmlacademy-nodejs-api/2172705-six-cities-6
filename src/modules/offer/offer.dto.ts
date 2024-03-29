import { EHousingType } from '../../shared/const/index.js';
import type { TLocation } from '../../shared/types/index.js';

export class OfferDTO {
  public title: string;
  public description: string;
  public date: string;
  public previewImage: string;
  public imagesList: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public housingType: EHousingType;
  public roomsCount: number;
  public guestsCount: number;
  public cost: number;
  public location: TLocation;
  public facilityIds: string[];
  public authorId: string;
  public cityId: string;
}
