import crypto from 'node:crypto';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jwtVerify } from 'jose';
import { Middleware } from './middleware.interface.js';
import { TokenPayload } from '../../../modules/auth/index.js';
import { HttpError } from '../index.js';

const isTokenPayload = (payload: unknown): payload is TokenPayload =>
  typeof payload === 'object' &&
  payload !== null &&
  'email' in payload &&
  typeof payload.email === 'string' &&
  'name' in payload &&
  typeof payload.name === 'string' &&
  'type' in payload &&
  typeof payload.type === 'string' &&
  'id' in payload &&
  typeof payload.id === 'string';

export class ParseTokenMiddleware implements Middleware {
  constructor(private readonly jwtSecret: string) {}

  public execute = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const authorizationHeader = req.headers?.authorization?.split(' ');
    if (!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader;

    try {
      const { payload } = await jwtVerify(
        token,
        crypto.createSecretKey(this.jwtSecret, 'utf-8')
      );

      if (isTokenPayload(payload)) {
        req.tokenPayload = { ...payload };
        return next();
      }
    } catch {
      return next(
        new HttpError(
          StatusCodes.UNAUTHORIZED,
          'Invalid token',
          'AuthenticateMiddleware'
        )
      );
    }
  };
}
