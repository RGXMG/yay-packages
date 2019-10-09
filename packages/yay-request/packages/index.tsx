/* eslint-disable */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosPromise } from 'axios';
import { defaultsDeep } from 'lodash';
interface PathParam {
  path: {
    [key: string]: string;
  };
}
interface InterceptorHandler<V> {
  (value: V): V | Promise<V>;
}
interface InterceptorErrorHandler {
  (error: any): any;
}
type WithPathOpts = AxiosRequestConfig & PathParam;

const instance = axios.create({
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
});
/**
 * 创建instance
 * 如果需要配置opts其他参数，
 * 通过T传进来
 * @param baseURL
 */
function createAPI<T>(baseURL?: string) {
  return function (conf: AxiosRequestConfig & {
    opts?: Partial<AxiosRequestConfig & PathParam & T>;
  }):AxiosPromise {
    conf = conf || {};
    // @ts-ignore
    return instance(Object.assign({}, {
      url: conf.url,
      baseURL: baseURL,
      method: conf.method
    }, conf.opts));
  };
}
/**
 * 转换API
 * 适用于/applications/{applyId} => /applications/3
 * 适用于/applications/{applyId}/rem => /applications/3/rem
 * @param url
 * @param opts
 */
function convertRESTAPI(url: string, opts: WithPathOpts) {
  if (!opts || !opts.path) return url;
  const pathKeys = Object.keys(opts.path);
  pathKeys.forEach(function (key) {
    const r = new RegExp('(:' + key + '|{' + key + '})', 'g');
    url = url.replace(r, opts.path[key]);
  });
  return url;
}
/**
 * 连接Uri
 * 适用于前后相连接
 * @param prefix
 */
function concatUri(prefix: string) {
  return (end: string) => `${prefix}${end}`;
}

function useRequestInterceptor(beforeRequestHandler?: InterceptorHandler<AxiosRequestConfig>, errorHandler?: InterceptorErrorHandler) {
  // @ts-ignore
  return instance.interceptors.request.use(beforeRequestHandler, errorHandler);
}
function useResponseInterceptor(successHandler?: InterceptorHandler<AxiosResponse>, errorHandler?: InterceptorErrorHandler) {
  // @ts-ignore
  return instance.interceptors.response.use(successHandler, errorHandler);
}
function ejectRequestInterceptor(interceptorId: number) {
  instance.interceptors.request.eject(interceptorId);
}
function ejectResponseInterceptor(interceptorId: number) {
  instance.interceptors.response.eject(interceptorId);
}
function mergeDefaults(...defaults: AxiosRequestConfig[]) {
  return instance.defaults = defaultsDeep.apply(undefined, [instance.defaults].concat(defaults));
}
export { createAPI, convertRESTAPI, concatUri, useRequestInterceptor, useResponseInterceptor, ejectRequestInterceptor, ejectResponseInterceptor, mergeDefaults };