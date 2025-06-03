import crypto from 'node:crypto';
import { SignJWT } from 'jose';
import { inject, injectable } from 'inversify';
import { AuthService } from './types/auth-service.interface.js';
import { Logger } from '../../libs/logger/index.js';
import { LoginDto, UserEntity, UserService } from '../user/index.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { JWT_ALGORITHM, JWT_EXPIRED } from './auth.constant.js';
import { Component } from '../../di/index.js';
import { TokenPayload } from './index.js';
import {
  UserNotFoundException,
  UserPasswordIncorrectException,
} from './errors/index.js';
import { DocumentType } from '@typegoose/typegoose';

@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {}

  public async authenticate(user: DocumentType<UserEntity>): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');

    const tokenPayload: TokenPayload = {
      email: user.email,
      name: user.name,
      type: user.type,
      id: user.id,
    };

    this.logger.info(`Create token for ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRED)
      .sign(secretKey);
  }

  public async verify(dto: LoginDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      this.logger.warn(`User with ${dto.email} not found`);
      throw new UserNotFoundException();
    }

    if (!user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for ${dto.email}`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }
}
