import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { ECity } from '../../shared/const/index.js';
import { createEnumFromArray } from '../../shared/lib/index.js';
import type { ICity } from '../../shared/interfaces/index.js';
import type { TLocation } from '../../shared/types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CityEntity implements ICity {
  @prop({
    required: true,
    trim: true,
    type: String,
    enum: createEnumFromArray(Object.keys(ECity)),
  })
  public name: keyof typeof ECity;

  @prop({ required: true })
  public location: TLocation;
}

export const CityModel = getModelForClass(CityEntity);
