import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import {
  parseOffer,
  getErrorMessage,
  getMongoURI,
} from '../../shared/helpers/index.js';
import { ICommand, Command } from './index.js';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';
import { Offer } from '../../shared/types/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';

import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../../shared/libs/database-client/index.js';
import {
  DefaultOfferService,
  OfferService,
  OfferModel,
} from '../../shared/modules/offer/index.js';
import {
  DefaultUserService,
  UserService,
  UserModel,
} from '../../shared/modules/user/index.js';

export class ImportCommand implements ICommand {
  private userService: UserService;
  private offerService: OfferService;
  private db: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.db = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return Command.Import;
  }

  public async execute(
    fileName: string,
    username: string,
    password: string,
    host: string,
    databaseName: string,
    salt: string
  ): Promise<void> {
    this.salt = salt;

    const uri = getMongoURI({
      username,
      password,
      host,
      port: DEFAULT_DB_PORT,
      databaseName,
    });

    await this.db.connect(uri);

    const fileReader = new TSVFileReader(fileName.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${fileName}`);
      console.error(getErrorMessage(error));
    }
  }

  private onImportedLine = async (line: string, resolve: () => void) => {
    const offer = parseOffer(line);
    await this.saveOffer(offer);
    resolve();
  };

  private onCompleteImport = (count: number) => {
    console.info(`${count} rows imported.`);
    this.db.disconnect();
  };

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate(
      {
        ...offer.author,
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt
    );

    await this.offerService.create({ ...offer, author: user });
  }
}
