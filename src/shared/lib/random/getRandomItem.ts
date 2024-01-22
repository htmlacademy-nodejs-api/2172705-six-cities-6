import { getRandomNumber } from './getRandomNumber.js';

export const getRandomItem = <T>(items: T[]): T => items[getRandomNumber(0, items.length - 1)];
