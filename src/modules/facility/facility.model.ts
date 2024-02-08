import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { EFacility } from '../../shared/const/index.js';
import { IFacility } from '../../shared/interfaces/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface FacilityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'facilities',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class FacilityEntity implements IFacility {
  @prop({
    required: true,
    trim: true,
    type: String,
    enum: EFacility,
  })
  public name: EFacility;
}

export const FacilityModel = getModelForClass(FacilityEntity);
