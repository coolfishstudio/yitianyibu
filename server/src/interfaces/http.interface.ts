/**
 * http 响应接口模型
 */

export type TMessage = string;
export type TExceptionOption = TMessage | {
  message: TMessage;
  error?: any
};
