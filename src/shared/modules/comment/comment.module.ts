import { types } from '@typegoose/typegoose';
import { ContainerModule } from 'inversify';
import { Component } from '../../di/component.js';
import {
  CommentEntity,
  CommentModel,
  DefaultCommentService,
  CommentService,
} from './index.js';

export const createCommentModule = () =>
  new ContainerModule((commentModule) => {
    commentModule
      .bind<CommentService>(Component.CommentService)
      .to(DefaultCommentService)
      .inSingletonScope();
    commentModule
      .bind<types.ModelType<CommentEntity>>(Component.CommentModel)
      .toConstantValue(CommentModel);
  });
