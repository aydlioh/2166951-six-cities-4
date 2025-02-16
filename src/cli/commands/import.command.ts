import { ICommand, Command } from './index.js';
import { TSVFileReader } from '../../shared/libs/index.js';
import { OfferParser } from '../utils/index.js';

export class ImportCommand implements ICommand {
  public getName(): string {
    return Command.Import;
  }

  public execute(...args: string[]): void {
    const [fileName] = args;
    const fileReader = new TSVFileReader(fileName);

    try {
      const data = fileReader.read().toArray();
      const offers = OfferParser.parse(data);
      console.log(offers);
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(`Can't import data from file: ${fileName}`);
      console.error(`Details: ${error.message}`);
    }
  }
}
