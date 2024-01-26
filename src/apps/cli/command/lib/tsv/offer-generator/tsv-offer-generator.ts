import dayjs from 'dayjs';
import { getRandomItem, getRandomItems, getRandomNumber } from '@/shared/lib/index.js';
import { TMockServerData } from '@/apps/cli/mock/mock-server-data.type.js';
import { ITSVOfferGenerator } from './tsv-offer-generator.interface.js';
import {
  Cost,
  GuestsCount,
  RoomsCount,
  Rating,
} from '@/shared/const/index.js';
import { TOffer } from '@/shared/types/offer.type.js';

enum DateGeneration {
  Min = 1,
  Max = 240,
  Unit = 'hour'
}

enum LocationGeneration {
  Epsilon = 0.1,
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
      .subtract(
        getRandomNumber(DateGeneration.Min, DateGeneration.Max),
        DateGeneration.Unit,
      )
      .toISOString();

    const cityData = getRandomItem(this._mockData.cities);
    const { name: city } = cityData;

    const location = cityData.location
      .map(
        (item) =>
          getRandomNumber(
            item - LocationGeneration.Epsilon,
            item + LocationGeneration.Epsilon,
            LocationGeneration.Precision,
          ),
      )
      .join(';');

    const previewImage = 'https://loremflickr.com/400/400/apartment';

    const imagesList = `${Array.from({ length: IMAGES_LIST_LENGTH })
      .map(() => 'https://loremflickr.com/250/250/apartment')
      .join(';')}`;

    const isPremium = Boolean(getRandomNumber(0, 1));
    const isFavorite = Boolean(getRandomNumber(0, 1));
    const rating = getRandomNumber(Rating.Min, Rating.Max, Rating.Precision);
    const housingType = getRandomItem(this._mockData.housingTypes);
    const roomsCount = getRandomNumber(RoomsCount.Min, RoomsCount.Max);
    const guestsCount = getRandomNumber(GuestsCount.Min, GuestsCount.Max);
    const cost = getRandomNumber(Cost.Min, Cost.Max);
    const facilities = getRandomItems(this._mockData.facilities).join(';');
    const author = Object.values(getRandomItem(this._mockData.authors)).join(';');
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
