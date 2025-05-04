import { inject, injectable } from 'inversify';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/di/component.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { getMongoURI } from '../shared/helpers/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly db: DatabaseClient
  ) {}

  public async init() {
    this.logger.info('Rest application initialized');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database...');
    await this._initDB();
    this.logger.info('Init database completed');
  }

  private async _initDB() {
    const mongoURI = getMongoURI({
      username: this.config.get('DB_USER'),
      password: this.config.get('DB_PASSWORD'),
      host: this.config.get('DB_HOST'),
      port: this.config.get('DB_PORT'),
      databaseName: this.config.get('DB_NAME'),
    });

    return this.db.connect(mongoURI);
  }
}
