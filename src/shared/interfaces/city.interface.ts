import { ECity } from '../const/index.js';
import { TLocation } from '../types/index.js';

export interface ICity {
  name: keyof typeof ECity;
  location: TLocation;
}
