export const createEnumFromArray = <T extends string | symbol | number>(
  arr: T[],
): { [K in T]: number } =>
    arr.reduce((acc, item) => {
      acc[item] = item;

      return acc;
    }, Object.create(null));
