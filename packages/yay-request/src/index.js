/* eslint-disable */
import axios from 'axios';
import defaultsDeep from 'lodash/defaultsDeep';
const instance = axios.create({
    withCredentials: true,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
});
/**
 * 创建instance
 * 如果需要配置opts其他参数，
 * 通过T传进来
 * @param baseURL
 */
function createAPI(baseURL) {
    return function (conf) {
        conf = conf || {};
        // @ts-ignore
        return instance(Object.assign({}, {
            url: conf.url,
            baseURL: baseURL,
            method: conf.method,
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
function convertRESTAPI(url, opts) {
    if (!opts || !opts.path)
        return url;
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
function concatUri(prefix) {
    return (end) => `${prefix}${end}`;
}
function useRequestInterceptor(beforeRequestHandler, errorHandler) {
    // @ts-ignore
    return instance.interceptors.request.use(beforeRequestHandler, errorHandler);
}
function useResponseInterceptor(successHandler, errorHandler) {
    // @ts-ignore
    return instance.interceptors.response.use(successHandler, errorHandler);
}
function ejectRequestInterceptor(interceptorId) {
    instance.interceptors.request.eject(interceptorId);
}
function ejectResponseInterceptor(interceptorId) {
    instance.interceptors.response.eject(interceptorId);
}
function mergeDefaults(...defaults) {
    return (instance.defaults = defaultsDeep.apply(undefined, [instance.defaults].concat(defaults)));
}
export { createAPI, convertRESTAPI, concatUri, useRequestInterceptor, useResponseInterceptor, ejectRequestInterceptor, ejectResponseInterceptor, mergeDefaults, };
