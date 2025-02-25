import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { createOffer, getErrorMessage } from '../../shared/helpers/index.js';
import { ICommand, Command } from './index.js';

export class ImportCommand implements ICommand {
  public getName(): string {
    return Command.Import;
  }

  public async execute(...args: string[]): Promise<void> {
    const [fileName] = args;
    const fileReader = new TSVFileReader(fileName);

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${fileName}`);
      console.error(getErrorMessage(error));
    }
  }

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }
}
