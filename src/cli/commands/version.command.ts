import { ICommand, Command } from './index.js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type PackageJSONConfig = {
  version: string;
};

const isPackageJSONConfig = (value: unknown): value is PackageJSONConfig =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  Object.hasOwn(value, 'version');

export class VersionCommand implements ICommand {
  constructor(private filePath: string = './package.json') {}

  public getName(): string {
    return Command.Version;
  }

  public execute(..._args: string[]): void {
    try {
      const version = this.readVersion();
      console.info(`Version: ${version}`);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  private readVersion(): string {
    const packageJson = readFileSync(resolve(this.filePath), 'utf-8');
    const content = JSON.parse(packageJson);

    if (!isPackageJSONConfig(content)) {
      throw new Error('Failed to parse json content.');
    }

    return content.version;
  }
}
