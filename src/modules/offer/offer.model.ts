import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop
} from '@typegoose/typegoose';
import type {Ref} from '@typegoose/typegoose';
import {
  OfferTitle,
  OfferDescription,
  Rating,
  HousingType,
  RoomsCount,
  GuestsCount,
  Cost,
  Facility,
} from '../../shared/const/index.js';
import type { TLocation } from '../../shared/types/index.js';
import { UserEntity } from '../user/user.model.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity {
  @prop({
    required: true,
    trim: true,
    minlength: [OfferTitle.Min, 'Min length for title is 10'],
    maxlength: [OfferTitle.Max, 'Max length for title is 100'],
  })
  public title: string;

  @prop({
    required: true,
    trim: true,
    minlength: [OfferDescription.Min, 'Min length for description is 20'],
    maxlength: [OfferDescription.Max, 'Max length for description is 1024'],
  })
  public description: string;

  @prop({ required: true })
  public date: string;

  @prop({ required: true })
  public city: string;

  @prop({ required: true })
  public previewImage: string;

  @prop({ required: true })
  public imagesList: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorite: boolean;

  @prop({
    required: true,
    min: [Rating.Min, 'Min value for rating is 1'],
    max: [Rating.Max, 'Max value for rating is 5'],
  })
  public rating: number;

  @prop({
    required: true,
    type: () => String,
    enum: HousingType,
  })
  public housingType: HousingType;

  @prop({
    required: true,
    min: [RoomsCount.Min, 'Min value for rooms count is 1'],
    max: [RoomsCount.Max, 'Max value for rooms count is 8'],
  })
  public roomsCount: number;

  @prop({
    required: true,
    min: [GuestsCount.Min, 'Min value for guests count is 1'],
    max: [GuestsCount.Max, 'Max value for guests count is 10'],
  })
  public guestsCount: number;

  @prop({
    required: true,
    min: [Cost.Min, 'Min value for cost is 100'],
    max: [Cost.Max, 'Max value for cost is 100000'],
  })
  public cost: number;

  @prop({
    required: true,
    type: () => [String],
    enum: Facility,
  })
  public facilities: Facility[];

  @prop({
    required: true,
    ref: UserEntity
  })
  public authorId: Ref<UserEntity>;

  @prop({ required: true })
  public location: TLocation;

  @prop({
    required: true,
    default: 0
  })
  public commentsCount: number;
}

export const OfferModel = getModelForClass(OfferEntity);
