/**
 * 403 权限不足禁止访问
 */

import { HttpException, HttpStatus } from '@nestjs/common';
import * as TEXT from '../constants/text.constant';

export class HttpForbiddenError extends HttpException {
  constructor(error?: any) {
    super(error || TEXT.HTTP_FORBIDDEN, HttpStatus.FORBIDDEN);
  }
}
