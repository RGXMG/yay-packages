import keyIsExisted from '../object/keyIsExisted';
import len from '../array/len';
import isArray from '../array/isArray';
import isObject from '../object/isObject';
import isComplexType from './isComplexType';
/**
 * 安全的取值
 * 支持与预先定义宿主和默认值进行取值
 * 预先定义宿主 就返回一个function
 * 预先定义宿主时可以传选传统一的默认值
 * 即使定义了统一的默认值, 依旧可以在使用时第二参数传入此项的默认值
 * 不预先定义宿主 传入三个参数
 * (host: {Object}对象宿主,
 * key/keys: {Array|String}想依次取得的key值
 * defaultV: {any}没有完成取值操作的默认值)
 * @returns {Function}
 */
const index = function index(...params) {
  /**
   * 获取多项值
   * @param host
   * @param keys
   * @param defaultV
   * @returns {*}
   */
  const getManyVal = function getManyVal(host, keys, defaultV) {
    let valForHost = {};
    for (const k of keys) {
      if (keyIsExisted(valForHost, k)) {
        valForHost = valForHost[k];
        continue;
      }
      if (keyIsExisted(host, k)) {
        valForHost = host[k];
        continue;
      }
      return defaultV;
    }
    return valForHost;
  };
  // 没有预先定义宿主 需要传入三个参数
  if (len(params) === 3 && params[0]) {
    const host = params[0];
    const p2 = params[1];
    const defalutV = params[2];
    if (isArray(p2)) return getManyVal(host, p2, defalutV);
    return host[p2] || defalutV;
  }
  // 预先定义宿主
  if (len(params) === 2 && isComplexType(params[0])) {
    return function() {
      const hostParams = [].concat(Array.prototype.slice.call(arguments));
      const host = params[0];
      const defalutV = params[1];
      if (!len(hostParams) || isObject(hostParams[0])) return null;
      if (isArray(hostParams[0])) {
        return getManyVal(host, hostParams[0], hostParams[1] || defalutV);
      }
      if (host[hostParams[0]]) return host[hostParams[0]];
      if (hostParams[1]) return hostParams[1];
      return defalutV;
    };
  }
  throw new Error('securityGetVal参数不齐全');
};
export default index;
