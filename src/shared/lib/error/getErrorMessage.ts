export const getErrorMessage = (error: unknown): unknown => {
  return error instanceof Error ? error.message : error;
};
