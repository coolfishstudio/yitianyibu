/**
 * 鉴权守卫
 * Token 是否存在 -> Token 是否在有效期内 -> Token 解析出的数据是否对的上
 */

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HttpUnauthorizedError } from '../errors/unauthorized.error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(error, authInfo, errorInfo) {
    if (authInfo && !error && !errorInfo) {
      return authInfo;
    } else {
      throw error || new HttpUnauthorizedError(null, errorInfo && errorInfo.message);
    }
  }
}
