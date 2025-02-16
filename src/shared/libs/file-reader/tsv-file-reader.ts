import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';

export class TSVFileReader implements FileReader {
  private rawData: string = '';

  constructor(private readonly fileName: string) {}

  public read(): TSVFileReader {
    this.rawData = readFileSync(this.fileName, { encoding: 'utf-8' });
    return this;
  }

  public toArray(): string[][] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .map((row) => row.trim())
      .filter(Boolean)
      .map((line) => line.split('\t'));
  }
}
