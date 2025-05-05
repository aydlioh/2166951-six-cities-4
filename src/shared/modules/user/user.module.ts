import { types } from '@typegoose/typegoose';
import { ContainerModule } from 'inversify';
import { Component } from '../../di/component.js';
import {
  UserEntity,
  UserModel,
  UserService,
  DefaultUserService,
} from './index.js';

export const createUserModule = () =>
  new ContainerModule((userModule) => {
    userModule
      .bind<UserService>(Component.UserService)
      .to(DefaultUserService)
      .inSingletonScope();
    userModule
      .bind<types.ModelType<UserEntity>>(Component.UserModel)
      .toConstantValue(UserModel);
  });
