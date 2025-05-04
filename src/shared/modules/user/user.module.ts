import { types } from '@typegoose/typegoose';
import { ContainerModule } from 'inversify';
import { Component } from '../../di/component.js';
import { UserService } from './user-service.interface.js';
import { DefaultUserService } from './default-user.service.js';
import { UserEntity, UserModel } from './user.entity.js';

export const createUserModule = () =>
  new ContainerModule((userModule) => {
    userModule.bind<UserService>(Component.UserService).to(DefaultUserService);
    userModule
      .bind<types.ModelType<UserEntity>>(Component.UserModel)
      .toConstantValue(UserModel);
  });
