import { EFacility, EHousingType, EUserType } from '../../../../../../shared/const/index.js';
import type { IOffer } from '../../../../../../shared/interfaces/index.js';
import type { TLocation } from '../../../../../../shared/types/index.js';
import type { IUser } from '../../../../../../shared/interfaces/user.interface.js';

const getAuthorData = (data: string): IUser => {
  const parsedData = data.split(';');
  const [firstname, email, avatar, type] = parsedData;

  return {
    firstname,
    email,
    avatar,
    type: type as EUserType,
  };
};

const getLocationData = (data: string): TLocation => {
  const parsedData = data.split(';');
  const [latitude, longitude] = parsedData;

  return {
    latitude: Number(latitude),
    longitude: Number(longitude),
  };
};

export const createOffer = (tsvRecord: string): IOffer => {
  const [
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
  ] = tsvRecord.replace('\n', '').split('\t');

  return {
    title,
    description,
    date,
    city,
    previewImage,
    imagesList: imagesList.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number(rating),
    housingType: housingType as EHousingType,
    roomsCount: Number(roomsCount),
    guestsCount: Number(guestsCount),
    cost: Number(cost),
    facilities: facilities.split(';') as EFacility[],
    author: getAuthorData(author),
    commentsCount: Number(commentsCount),
    location: getLocationData(location),
  };
};
