import { createReadStream } from 'node:fs';
import EventEmitter from 'node:events';
import * as readline from 'node:readline/promises';
import { ITSVFileReader } from './tsv-file-reader.interface.js';

export class TSVFileReader extends EventEmitter implements ITSVFileReader {
  constructor(private readonly _filePath: string) {
    super();
  }

  public async read(): Promise<void> {
    const rl = readline.createInterface({
      input: createReadStream(this._filePath, {
        encoding: 'utf-8',
        autoClose: true,
      }),
    });

    //NOTE: the first record is a header with field names that should be skipped
    let readedRecordsCount = -1;

    rl.on('line', (line) => {
      readedRecordsCount++;

      if (readedRecordsCount !== 0) {
        this.emit('readed', line);
      }
    });

    rl.on('close', () => {
      this.emit('end', readedRecordsCount);
    });
  }
}
