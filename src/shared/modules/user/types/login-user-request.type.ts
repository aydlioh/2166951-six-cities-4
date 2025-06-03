import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../libs/rest/index.js';
import { LoginDto } from '../dto/login.dto.js';

export type LoginUserRequest = Request<RequestParams, RequestBody, LoginDto>;
