/**
 * 400/500 自定义错误
 */

import { HttpException, HttpStatus } from '@nestjs/common';
import { TExceptionOption } from '../interfaces/http.interface';

export class HttpCustomError extends HttpException {
  constructor(options: TExceptionOption, statusCode?: HttpStatus) {
    super(options, statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
