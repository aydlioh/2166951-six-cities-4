import { Response } from 'express';
import { inject } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import {
  BaseController,
  HttpError,
  HttpMethod,
  PrivateRouteMiddleware,
  ValidateDtoMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../di/component.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentRdo, CommentService } from './index.js';
import { OfferService } from '../offer/index.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { fillDTO } from '../../helpers/index.js';
import { CreateCommentRequest } from './types/create-comment-request.type.js';

export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService)
    private readonly commentService: CommentService,
    @inject(Component.OfferService)
    private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
      ],
    });
  }

  public async create(
    { body, tokenPayload }: CreateCommentRequest,
    res: Response
  ): Promise<void> {
    if (!(await this.offerService.exists(body.offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create({
      ...body,
      userId: tokenPayload.id,
    });
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
