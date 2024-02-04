import { createReadStream } from 'node:fs';
import EventEmitter from 'node:events';
import { ITSVFileReader } from './tsv-file-reader.interface.js';

export class TSVFileReader extends EventEmitter implements ITSVFileReader {
  constructor(private readonly _filePath: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this._filePath, {
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = -1;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        if (importedRowCount !== 0) {
          await new Promise((resolve) => {
            this.emit('readed', completeRow, resolve);
          });
        }
      }
    }

    this.emit('end', importedRowCount);
  }
}
