/**
 * 人为鉴权守卫
 * Token 不存在 | Token 存在且有效
 */

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HttpUnauthorizedError } from '../errors/unauthorized.error';

@Injectable()
export class HumanizedJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(error, authInfo, errorInfo) {
    const noAuthToken = !authInfo && errorInfo && errorInfo.message === 'No auth token';
    const tokenValid = !!authInfo;
    if (!error && (noAuthToken || tokenValid)) {
      return authInfo;
    } else {
      throw error || new HttpUnauthorizedError(null, errorInfo && errorInfo.message);
    }
  }
}
