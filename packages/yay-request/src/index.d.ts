import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from 'axios';
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
declare type WithPathOpts = AxiosRequestConfig & PathParam;
/**
 * 创建instance
 * 如果需要配置opts其他参数，
 * 通过T传进来
 * @param baseURL
 */
declare function createAPI<T>(baseURL?: string): (conf: AxiosRequestConfig & {
    opts?: Partial<AxiosRequestConfig & PathParam & T>;
}) => AxiosPromise;
/**
 * 转换API
 * 适用于/applications/{applyId} => /applications/3
 * 适用于/applications/{applyId}/rem => /applications/3/rem
 * @param url
 * @param opts
 */
declare function convertRESTAPI(url: string, opts: WithPathOpts): string;
/**
 * 连接Uri
 * 适用于前后相连接
 * @param prefix
 */
declare function concatUri(prefix: string): (end: string) => string;
declare function useRequestInterceptor(beforeRequestHandler?: InterceptorHandler<AxiosRequestConfig>, errorHandler?: InterceptorErrorHandler): any;
declare function useResponseInterceptor(successHandler?: InterceptorHandler<AxiosResponse>, errorHandler?: InterceptorErrorHandler): any;
declare function ejectRequestInterceptor(interceptorId: number): void;
declare function ejectResponseInterceptor(interceptorId: number): void;
declare function mergeDefaults(...defaults: AxiosRequestConfig[]): any;
export { createAPI, convertRESTAPI, concatUri, useRequestInterceptor, useResponseInterceptor, ejectRequestInterceptor, ejectResponseInterceptor, mergeDefaults, };
