/**
 * 401 权限验证失败
 */

import { UnauthorizedException } from '@nestjs/common';
import * as TEXT from '../constants/text.constant';
import { TMessage } from '../interfaces/http.interface';

export class HttpUnauthorizedError extends UnauthorizedException {
  constructor(message?: TMessage, error?: any) {
    super(message || TEXT.HTTP_UNAUTHORIZED_ERROR, error);
  }
}
