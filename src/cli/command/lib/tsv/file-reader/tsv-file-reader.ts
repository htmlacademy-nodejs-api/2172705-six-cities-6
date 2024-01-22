import { ReadStream, createReadStream } from 'node:fs';
import EventEmitter from 'node:events';
import { ITSVFileReader } from './tsv-file-reader.interface.js';

export class TSVFileReader extends EventEmitter implements ITSVFileReader {
  private _stream: ReadStream;

  constructor(private readonly _filePath: string) {
    super();
    this._stream = createReadStream(this._filePath, {
      encoding: 'utf-8',
      autoClose: true,
    });
  }

  public async read(): Promise<void> {
    let remainingData = '';
    let newLineCharPosition = -1;
    let readedRecordsCount = -1;

    for await (const chunk of this._stream) {
      remainingData += chunk.toString();

      while (remainingData.indexOf('\n') >= 0) {
        newLineCharPosition = remainingData.indexOf('\n');
        const readedRecord = remainingData.slice(0, newLineCharPosition + 1);
        remainingData = remainingData.slice(newLineCharPosition + 1);

        newLineCharPosition++;
        readedRecordsCount++;

        if (readedRecordsCount !== 0) {
          this.emit('readed', readedRecord);
        }
      }
    }

    this.emit('end', readedRecordsCount);
  }
}
