import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { FileReader } from './file-reader.interface.js';

const CHUNK_SIZE = 16 * 1024; // 16KB

export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(private readonly fileName: string) {
    super();
  }

  public async read(): Promise<void> {
    const stream = createReadStream(this.fileName, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of stream) {
      remainingData += chunk.toString();
      nextLinePosition = remainingData.indexOf('\n');

      while (nextLinePosition >= 0) {
        const row = remainingData.slice(0, nextLinePosition + 1);

        nextLinePosition++;
        importedRowCount++;
        remainingData = remainingData.slice(nextLinePosition);
        nextLinePosition = remainingData.indexOf('\n');

        this.emit('line', row);
      }
    }

    this.emit('end', importedRowCount);
  }
}
