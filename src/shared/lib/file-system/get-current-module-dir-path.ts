import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const getCurrentModuleDirPath = (url: string): string => dirname(fileURLToPath(url));
