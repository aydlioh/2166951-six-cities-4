import { types } from '@typegoose/typegoose';
import { ContainerModule } from 'inversify';
import { Component } from '../../di/component.js';
import { OfferService } from './offer-service.interface.js';
import { DefaultOfferService } from './default-offer.service.js';
import { OfferEntity, OfferModel } from './offer.entity.js';

export const createOfferModule = () =>
  new ContainerModule((offerModule) => {
    offerModule
      .bind<OfferService>(Component.OfferService)
      .to(DefaultOfferService);
    offerModule
      .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
      .toConstantValue(OfferModel);
  });
