/**
 * 400 验证报错
 */

import { HttpException, HttpStatus } from '@nestjs/common';
import * as TEXT from '../constants/text.constant';

export class HttpValidationError extends HttpException {
  constructor(error?: any) {
    super(error || TEXT.HTTP_VALIDATION_ERROR, HttpStatus.BAD_REQUEST);
  }
}
