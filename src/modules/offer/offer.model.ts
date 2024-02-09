import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';
import {
  ERating,
  EHousingType,
  ERooms,
  EGuests,
  ECost,
} from '../../shared/const/index.js';
import type { TLocation } from '../../shared/types/index.js';
import type { IOffer } from '../../shared/interfaces/index.js';
import { FacilityEntity } from '../facility/index.js';
import { UserEntity } from '../user/index.js';
import { CityEntity } from '../city/index.js';
import { EDescription, ETitle } from './const/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity implements Omit<IOffer, 'author' | 'facilities' | 'city'> {
  @prop({
    required: true,
    trim: true,
    minlength: [ETitle.Min, 'Min length for title is 10'],
    maxlength: [ETitle.Max, 'Max length for title is 100'],
  })
  public title: string;

  @prop({
    required: true,
    trim: true,
    minlength: [EDescription.Min, 'Min length for description is 20'],
    maxlength: [EDescription.Max, 'Max length for description is 1024'],
  })
  public description: string;

  @prop({ required: true })
  public date: string;

  @prop({ required: true })
  public previewImage: string;

  @prop({
    required: true,
    type: [String],
  })
  public imagesList: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorite: boolean;

  @prop({
    required: true,
    min: [ERating.Min, 'Min value for rating is 1'],
    max: [ERating.Max, 'Max value for rating is 5'],
  })
  public rating: number;

  @prop({
    required: true,
    type: String,
    enum: EHousingType,
  })
  public housingType: EHousingType;

  @prop({
    required: true,
    min: [ERooms.Min, 'Min value for rooms count is 1'],
    max: [ERooms.Max, 'Max value for rooms count is 8'],
  })
  public roomsCount: number;

  @prop({
    required: true,
    min: [EGuests.Min, 'Min value for guests count is 1'],
    max: [EGuests.Max, 'Max value for guests count is 10'],
  })
  public guestsCount: number;

  @prop({
    required: true,
    min: [ECost.Min, 'Min value for cost is 100'],
    max: [ECost.Max, 'Max value for cost is 100000'],
  })
  public cost: number;

  @prop({ required: true })
  public location: TLocation;

  @prop({
    required: true,
    default: 0,
  })
  public commentsCount: number;

  @prop({
    required: true,
    ref: FacilityEntity,
    default: [],
  })
  public facilityIds: Ref<FacilityEntity>[];

  @prop({
    required: true,
    ref: UserEntity,
  })
  public authorId: Ref<UserEntity>;

  @prop({
    required: true,
    ref: CityEntity,
  })
  public cityId: Ref<CityEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
