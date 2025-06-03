import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './shared/di/index.js';
import { RestApplication, createRestApplicationModule } from './rest/index.js';
import { createUserModule } from './shared/modules/user/index.js';
import { createOfferModule } from './shared/modules/offer/index.js';
import { createCommentModule } from './shared/modules/comment/index.js';
import { createFavoriteModule } from './shared/modules/favorite/index.js';
import { createAuthModule } from './shared/modules/auth/index.js';

const bootstrap = async () => {
  const diContainer = new Container();
  diContainer.load(
    createRestApplicationModule(),
    createUserModule(),
    createOfferModule(),
    createCommentModule(),
    createFavoriteModule(),
    createAuthModule()
  );

  const app = diContainer.get<RestApplication>(Component.RestApplication);
  await app.init();
};

bootstrap();
