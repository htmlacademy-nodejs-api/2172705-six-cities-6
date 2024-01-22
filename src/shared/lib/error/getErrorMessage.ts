export const getErrorMessage = (error: unknown): unknown => error instanceof Error ? error.message : error;
