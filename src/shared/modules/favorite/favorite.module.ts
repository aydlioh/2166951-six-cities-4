import { types } from '@typegoose/typegoose';
import { ContainerModule } from 'inversify';
import { Component } from '../../di/component.js';
import { FavoriteEntity, FavoriteModel } from './index.js';

export const createFavoriteModule = () =>
  new ContainerModule((favoriteModule) => {
    favoriteModule
      .bind<types.ModelType<FavoriteEntity>>(Component.FavoriteModel)
      .toConstantValue(FavoriteModel);
  });
