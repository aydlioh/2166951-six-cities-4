import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import {
  BaseController,
  HttpError,
  HttpMethod,
} from '../../libs/rest/index.js';
import { Component } from '../../di/index.js';
import { Logger } from '../../libs/logger/index.js';
import { fillDTO } from '../../helpers/common.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';
import { OfferService, OfferRdo } from './index.js';
import { CreateOfferRequest } from './types/create-offer-request.type.js';
import { City } from '../../types/offer.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.getAll,
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getOne,
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
    });

    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.getPremium,
    });

    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Post,
      handler: this.addFavorite,
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Delete,
      handler: this.deleteFavorite,
    });
  }

  public async getAll(req: Request, res: Response) {
    const limit =
      parseInt(req.query.limit as string, 10) || DEFAULT_OFFER_COUNT;

    const offers = await this.offerService.findAll(limit);

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async getOne(req: Request, res: Response) {
    const offer = await this.offerService.findById(req.params.offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Offer not found',
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async create({ body }: CreateOfferRequest, res: Response) {
    const newOffer = await this.offerService.create(body);

    this.created(res, fillDTO(OfferRdo, newOffer));
  }

  public async update(req: Request, res: Response) {
    const updatedOffer = await this.offerService.updateById(
      req.params.offerId,
      req.body
    );

    if (!updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Offer not found',
        'OfferController'
      );
    }

    this.created(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async delete(req: Request, res: Response) {
    const deletedOffer = await this.offerService.deleteById(req.params.offerId);

    if (!deletedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Offer not found',
        'OfferController'
      );
    }

    this.noContent(res, {});
  }

  public async getPremium(req: Request, res: Response) {
    const offers = await this.offerService.findPremiumOffersByCity(
      req.params.city as City,
      req.body.userId
    );

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async getFavorites(req: Request, res: Response) {
    const offers = await this.offerService.getUserFavorites(req.body.userId);

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async addFavorite(req: Request, res: Response) {
    const offer = await this.offerService.addFavorite(
      req.body.userId,
      req.params.offerId
    );

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Offer not found',
        'OfferController'
      );
    }

    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async deleteFavorite(req: Request, res: Response) {
    await this.offerService.deleteFavorite(req.body.userId, req.params.offerId);

    this.noContent(res, {});
  }
}
