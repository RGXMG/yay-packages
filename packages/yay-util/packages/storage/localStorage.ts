import getKeys from '../object/getKeys';
import isFunction from '../function/isFunction';
import isObject from '../object/isObject';
import len from '../array/len';
/**
 * localStorage 操作
 * 1. 通过简单的name,value方式设置
 * 2. 传入Object对象，同时设置多个，key为name，value为value
 * 3. 传入的name，value中的value为function
 *    在function回调中会传入localStorage中对应的name值，function返回一个值
 *    相当于更新
 * @type {{}}
 */
const index = {
  get: function get(name: string) {
    return JSON.parse(window.localStorage.getItem(name) || null);
  },
  set: function set(...args) {
    /**
     * 通过name, value直接设置
     * @param n
     * @param v
     */
    const setVal = function setVal(n, v) {
      return window.localStorage.setItem(n, JSON.stringify(v));
    };
    /**
     * 通过key:value键值对设置
     * @param obj
     */
    const setValByObj = function setValByObj(obj) {
      if (!isObject(obj)) throw new Error('');
      getKeys(obj).forEach(function(i) {
        return setVal(i, obj[i]);
      });
    };
    // 通过传入Object的方式设置
    if (len(args) === 1 && isObject(args[0])) {
      setValByObj(args[0]);
      // 通过name, value方式设置
    } else if (len(args) === 2) {
      const key = args[0];
      // value为function，更新localStorage中的[key]对应的值
      if (isFunction(args[1])) {
        let _setValByObj;
        setValByObj(
          ((_setValByObj = {}), (_setValByObj[key] = args[1](this.get(key))), _setValByObj)
        );
      } else {
        // @ts-ignore
        setVal.apply(undefined, args);
      }
    }
  },
};
export default {
  get: index.get,
  set: index.set.bind(index),
};
