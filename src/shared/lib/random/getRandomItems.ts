import { getRandomNumber } from './getRandomNumber.js';

export const getRandomItems = <T>(items: T[]): T[] => {
  const startPosition = getRandomNumber(0, items.length - 1);
  const endPosition = startPosition + getRandomNumber(startPosition, items.length);

  return items.slice(startPosition, endPosition);
};
