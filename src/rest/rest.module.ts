import { ContainerModule } from 'inversify';
import { Component } from '../shared/di/index.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { Config, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { RestApplication } from './rest.application.js';
import {
  AppExceptionFilter,
  ExceptionFilter,
} from '../shared/libs/rest/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../shared/libs/database-client/index.js';

export const createRestApplicationModule = () =>
  new ContainerModule((restModule) => {
    restModule
      .bind<RestApplication>(Component.RestApplication)
      .to(RestApplication)
      .inSingletonScope();
    restModule.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
    restModule
      .bind<Config<RestSchema>>(Component.Config)
      .to(RestConfig)
      .inSingletonScope();
    restModule
      .bind<DatabaseClient>(Component.DatabaseClient)
      .to(MongoDatabaseClient)
      .inSingletonScope();
    restModule
      .bind<ExceptionFilter>(Component.ExceptionFilter)
      .to(AppExceptionFilter)
      .inSingletonScope();
  });
