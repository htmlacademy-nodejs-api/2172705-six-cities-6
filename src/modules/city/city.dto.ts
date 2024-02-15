import { TLocation } from '../../shared/types/index.js';
import { ECity } from '../../shared/const/index.js';

export class CityDTO {
  public name: keyof typeof ECity;
  public location: TLocation;
}
