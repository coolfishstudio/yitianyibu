/**
 * 400 错误生成器
 */

import { HttpException, HttpStatus } from '@nestjs/common';
import * as TEXT from '../constants/text.constant';

export class HttpBadRequestError extends HttpException {
  constructor(error?: any) {
    super(error || TEXT.HTTP_BAD_REQUEST, HttpStatus.BAD_REQUEST)
  }
}
