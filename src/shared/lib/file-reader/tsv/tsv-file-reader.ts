import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { FacilitiesType, HousingType } from '../../../const/index.js';
import { TOffer } from '../../../types/index.js';
import { IFileReader } from '../interface/file-reader.interface.js';
import { getAuthorData } from './lib/get-author-data.js';
import { getCoordinatesData } from './lib/get-coordinates-data.js';

export class TSVFileReader implements IFileReader {
  constructor(
    private _filePath: string,
    private _rawData: string = ''
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
          coordinates,
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
          housingType: HousingType[housingType as HousingType],
          roomsCount: Number(roomsCount),
          guestsCount: Number(guestsCount),
          cost: Number(cost),
          facilities: facilities.split(';') as FacilitiesType[],
          author: getAuthorData(author),
          commentsCount: Number(commentsCount),
          coordinates: getCoordinatesData(coordinates),
        }),
      );
  }
}
