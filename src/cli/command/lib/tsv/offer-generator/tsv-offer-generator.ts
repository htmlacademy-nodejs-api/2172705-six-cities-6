import dayjs from 'dayjs';
import { TMockServerData } from '@/mock-server-data.type.js';
import { getRandomItem, getRandomItems, getRandomNumber } from '@/shared/lib/index.js';
import { ITSVOfferGenerator } from './tsv-offer-generator.interface.js';
import {
  Cost,
  GuestsCount,
  RoomsCount,
  Rating,
} from '@/shared/const/index.js';
import { TOffer } from '@/shared/types/offer.type.js';

enum DateGenerationEntry {
  Min = 1,
  Max = 30
}

enum LocationGenerationEntry {
  Min = 1,
  Max = 9,
  Precision = 6
}

enum CommentsCount {
  Min = 0,
  Max = 10
}

const IMAGES_LIST_LENGTH = 6;

export class TSVOfferGenerator implements ITSVOfferGenerator {
  constructor(
    private readonly _mockData: TMockServerData
  ) {}

  public generateHeader(): string {
    const fields: TuplifyUnion<keyof TOffer> = [
      'title',
      'description',
      'date',
      'city',
      'previewImage',
      'imagesList',
      'isPremium',
      'isFavorite',
      'rating',
      'housingType',
      'roomsCount',
      'guestsCount',
      'cost',
      'facilities',
      'author',
      'commentsCount',
      'location',
    ];

    return `${fields.join('\t')}\n`;
  }

  public generateRecord(): string {
    const title = getRandomItem(this._mockData.titles);
    const description = getRandomItem(this._mockData.descriptions);

    const date = dayjs()
      .subtract(getRandomNumber(DateGenerationEntry.Min, DateGenerationEntry.Max), 'days')
      .toISOString();

    const cityData = getRandomItem(this._mockData.cities);
    const { name: city } = cityData;

    const location = cityData.location
      .map(
        (item) =>
          item +
          getRandomNumber(
            LocationGenerationEntry.Min,
            LocationGenerationEntry.Min,
            LocationGenerationEntry.Precision,
          ),
      )
      .join(';');

    const previewImage = `${title
      .split(' ')
      .map((item) => item.toLowerCase())
      .join('-')}-preview.jpg`;

    const imagesList = `${Array.from({ length: IMAGES_LIST_LENGTH })
      .map((_, index) => previewImage.replace('preview', `${++index}`))
      .join(';')}`;

    const isPremium = Boolean(getRandomNumber(0, 1));
    const isFavorite = Boolean(getRandomNumber(0, 1));
    const rating = getRandomNumber(Rating.Min, Rating.Max, Rating.Precision);
    const housingType = getRandomItem(this._mockData.housingTypes);
    const roomsCount = getRandomNumber(RoomsCount.Min, RoomsCount.Max);
    const guestsCount = getRandomNumber(GuestsCount.Min, GuestsCount.Max);
    const cost = getRandomNumber(Cost.Min, Cost.Max);
    const facilities = getRandomItems(this._mockData.facilities).join(';');
    const author = getRandomItem(this._mockData.authors);
    const commentsCount = getRandomNumber(CommentsCount.Min, CommentsCount.Max);

    return `${[
      title,
      description,
      date,
      city,
      previewImage,
      imagesList,
      isPremium,
      isFavorite,
      rating,
      housingType,
      roomsCount,
      guestsCount,
      cost,
      facilities,
      author,
      commentsCount,
      location,
    ].join('\t')}\n`;
  }
}
