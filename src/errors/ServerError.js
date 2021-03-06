import * as errorTypes from '@/config/errors';

export default class ServerError extends Error {
  constructor(response) {
    super(response.errMsg || '请求后端服务发生未知异常');
    this.response = response;
    this.name = errorTypes.SERVER;
  }
}
