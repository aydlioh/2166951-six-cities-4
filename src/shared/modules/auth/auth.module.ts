import { ContainerModule } from 'inversify';
import { Component } from '../../di/component.js';
import { ExceptionFilter } from '../../libs/rest/index.js';
import { AuthService } from './types/auth-service.interface.js';
import { DefaultAuthService } from './default-auth.service.js';
import { AuthExceptionFilter } from './auth-exception.filter.js';

export const createAuthModule = () =>
  new ContainerModule((authModule) => {
    authModule
      .bind<AuthService>(Component.AuthService)
      .to(DefaultAuthService)
      .inSingletonScope();
    authModule
      .bind<ExceptionFilter>(Component.AuthExceptionFilter)
      .to(AuthExceptionFilter)
      .inSingletonScope();
  });
