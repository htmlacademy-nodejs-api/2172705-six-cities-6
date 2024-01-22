import { WriteStream, createWriteStream } from 'node:fs';
import { IFileWriter } from './file-writer.interface.js';

export class TSVFileWriter implements IFileWriter {
  private _stream: WriteStream;

  constructor(filePath: string) {
    this._stream = createWriteStream(filePath, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true,
    });
  }

  public async write(row: string): Promise<unknown> {
    const isWriteSuccess = this._stream.write(row);

    if (!isWriteSuccess) {
      return new Promise((resolve) => {
        this._stream.once('drain', () => resolve(true));
      });
    }

    return Promise.resolve();
  }
}
