import 'reflect-metadata';
import { Component, DIContainer } from './shared/di/index.js';
import { RestApplication } from './rest/index.js';
import { RestConfig } from './shared/libs/config/index.js';
import { PinoLogger } from './shared/libs/logger/index.js';

const bootstrap = async () => {
  const diContainer = new DIContainer().registerDependencies([
    {
      id: Component.RestApplication,
      dependency: RestApplication,
      singleton: true,
    },
    {
      id: Component.Config,
      dependency: RestConfig,
      singleton: true,
    },
    {
      id: Component.Logger,
      dependency: PinoLogger,
      singleton: true,
    },
  ]);

  const app = diContainer.get<RestApplication>(Component.RestApplication);
  await app.init();
};

bootstrap();
