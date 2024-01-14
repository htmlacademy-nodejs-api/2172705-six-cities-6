import { TCoordinates } from '../../../../types/coordinates.type.js';

export const getCoordinatesData = (data: string): TCoordinates => {
  const parsedData = data.split(';');
  const [latitude, longitude] = parsedData;

  return { latitude: Number(latitude), longitude: Number(longitude) };
};
