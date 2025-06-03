import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/di/component.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { getMongoURI } from '../shared/helpers/index.js';
import { ExceptionFilter } from '../shared/libs/rest/index.js';
import { OfferController } from '../shared/modules/offer/index.js';
import { UserController } from '../shared/modules/user/index.js';
import { CommentController } from '../shared/modules/comment/index.js';

@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly db: DatabaseClient,
    @inject(Component.ExceptionFilter)
    private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.OfferController)
    private readonly offerController: OfferController,
    @inject(Component.UserController)
    private readonly userController: UserController,
    @inject(Component.CommentController)
    private readonly commentController: CommentController
  ) {
    this.server = express();
  }

  public async init() {
    this.logger.info('Rest application initialized');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database...');
    await this._initDB();
    this.logger.info('Init database completed');

    this.logger.info('Init app-level middleware');
    await this._initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers');
    await this._initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters');
    await this._initExceptionFilters();
    this.logger.info('Exception filters initialization compleated');

    this.logger.info('Try to init server...');
    await this._initServer();
    this.logger.info(
      `Server started on http://localhost:${this.config.get('PORT')}`
    );
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

  private async _initMiddleware() {
    this.server.use(express.json());
  }

  private async _initControllers() {
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
    this.server.use('/comments', this.commentController.router);
  }

  private async _initExceptionFilters() {
    this.server.use(this.appExceptionFilter.catch);
  }

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }
}
