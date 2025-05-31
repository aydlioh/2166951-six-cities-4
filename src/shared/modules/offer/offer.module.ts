import { types } from '@typegoose/typegoose';
import { ContainerModule } from 'inversify';
import { Component } from '../../di/component.js';
import { Controller } from '../../libs/rest/index.js';
import {
  OfferEntity,
  OfferModel,
  OfferController,
  OfferService,
  DefaultOfferService,
} from './index.js';

export const createOfferModule = () =>
  new ContainerModule((offerModule) => {
    offerModule
      .bind<OfferService>(Component.OfferService)
      .to(DefaultOfferService)
      .inSingletonScope();
    offerModule
      .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
      .toConstantValue(OfferModel);
    offerModule
      .bind<Controller>(Component.OfferController)
      .to(OfferController)
      .inSingletonScope();
  });
