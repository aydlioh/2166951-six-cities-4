import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const getCurrentModuleDirectoryPath = (): string => {
  const filePath = fileURLToPath(import.meta.url);
  return dirname(filePath);
};
