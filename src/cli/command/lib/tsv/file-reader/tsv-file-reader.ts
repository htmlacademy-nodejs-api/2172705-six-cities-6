import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  TFacilities,
  THousingType,
  TLocation,
  TOffer,
  TUser,
  TUserType,
} from '@/shared/types/index.js';
import { ITSVFileReader } from './tsv-file-reader.interface.js';

const getAuthorData = (data: string): TUser => {
  const parsedData = data.split(';');
  const [firstname, email, avatar, password, type] = parsedData;

  return {
    firstname,
    email,
    avatar,
    password,
    type: type as TUserType
  };
};

const getLocationData = (data: string): TLocation => {
  const parsedData = data.split(';');
  const [latitude, longitude] = parsedData;

  return {
    latitude: Number(latitude),
    longitude: Number(longitude)
  };
};

export class TSVFileReader implements ITSVFileReader {
  private _rawData: string = '';

  constructor(
    private readonly _filePath: string
  ) {}

  public read(): void {
    this._rawData = readFileSync(resolve(this._filePath), { encoding: 'utf-8' });
  }

  public toArray() {
    return this._rawData
      .split('\n')
      .filter((row, index) => index !== 0 && row.trim())
      .map((row) => row.split('\t'))
      .map(
        ([
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
        ]): TOffer => ({
          title,
          description,
          date,
          city,
          previewImage,
          imagesList: imagesList.split(';'),
          isPremium: isPremium === 'true',
          isFavorite: isFavorite === 'true',
          rating: Number(rating),
          housingType: housingType as THousingType,
          roomsCount: Number(roomsCount),
          guestsCount: Number(guestsCount),
          cost: Number(cost),
          facilities: facilities.split(';') as TFacilities[],
          author: getAuthorData(author),
          commentsCount: Number(commentsCount),
          location: getLocationData(location),
        }),
      );
  }
}
