import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../logger/index.js';
import { Component } from '../../../di/index.js';
import { ExceptionFilter } from './exception-filter.interface.js';
import { HttpError } from '../errors/http-error.js';
import { createErrorObject } from '../../../helpers/common.js';

@injectable()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    this.logger.info('Register AppExceptionFilter...');
  }

  public catch = (
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (err instanceof HttpError) {
      return this.handleHttpError(err, req, res, next);
    }

    return this.handleOtherErrors(err, req, res, next);
  };

  private handleHttpError(
    err: HttpError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void {
    this.logger.error(`[${err.detail}]: ${err.status} — ${err.message}`, err);

    res.status(err.status).json(createErrorObject(err.message));
  }

  public handleOtherErrors(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void {
    this.logger.error(err.message, err);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(err.message));
  }
}
