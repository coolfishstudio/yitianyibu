/**
 * 请求参数解析装饰器
 */
import { createParamDecorator } from '@nestjs/common';
import { Types } from 'mongoose';

// 预置转换器可选字段
enum EQueryParamsField {
  Page = 'page',
  Keyword = 'keyword',
}

// 基础参数类型
interface IBaseConfig {
  [key: string]: string | number | boolean;
}

// 内置参数类型
interface IQueryParamsConfig {
  [key: string]: IBaseConfig | Types.ObjectId | Date | RegExp | IQueryParamsConfig;
};

// 导出数据结构
export interface IQueryParamsResult {
  querys: IQueryParamsConfig; // paginate 的查询参数
  options: IQueryParamsConfig; // paginate 的查询配置参数
  params: IQueryParamsConfig; // 路由参数
  origin: IQueryParamsConfig; // querys 参数
  request: any; // request 对象
  visitors: {
    // 访客对象
    ip: string; // ip
    ua: string; // ua
    referer: string; // 来源
  }
  isAuthenticated: boolean; // 是否鉴权
};

// 入参数据结构
export type TTransformConfig = EQueryParamsField | IBaseConfig;

export const QueryParams = createParamDecorator((customConfig: TTransformConfig[], request: any): IQueryParamsResult => {
  // 是否已验证权限
  const isAuthenticated = request.isAuthenticated();

  // 默认 querys 参数
  const origin = request.query;

  // 访客对象
  const ip = (
    request.headers['x-forwarded-for'] ||
    request.headers['x-real-ip'] ||
    request.connection.remoteAddress ||
    request.socket.remoteAddress ||
    request.connection.socket.remoteAddress ||
    request.ip ||
    request.ips[0]
  ).replace('::ffff:', '');
  const ua = request.headers['user-agent'];
  const referer = request.referer;

  const result = {
    querys: null,
    options: null,
    params: null,
    request,
    origin,
    visitors: {
      ip,
      ua,
      referer,
    },
    isAuthenticated,
  };

  console.log(result);

  return result;
});
