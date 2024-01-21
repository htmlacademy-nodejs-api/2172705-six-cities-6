export const getRandomNumber = (min: number, max: number, numAfterDigit = 0) => {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
};
