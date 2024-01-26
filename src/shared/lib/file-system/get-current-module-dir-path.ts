import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const getCurrentModuleDirPath = (): string => dirname(fileURLToPath(import.meta.url));
