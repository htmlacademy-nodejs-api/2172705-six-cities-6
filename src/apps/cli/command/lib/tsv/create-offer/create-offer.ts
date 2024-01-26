import {
  TFacilities,
  THousingType,
  TLocation,
  TUser,
  TUserType,
} from '@/shared/types/index.js';

const getAuthorData = (data: string): TUser => {
  const parsedData = data.split(';');
  const [firstname, email, password, avatar, type] = parsedData;

  return {
    firstname,
    email,
    password,
    avatar,
    type: type as TUserType,
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

export const createOffer = (tsvRecord: string) => {
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
    housingType: housingType as THousingType,
    roomsCount: Number(roomsCount),
    guestsCount: Number(guestsCount),
    cost: Number(cost),
    facilities: facilities.split(';') as TFacilities[],
    author: getAuthorData(author),
    commentsCount: Number(commentsCount),
    location: getLocationData(location),
  };
};
