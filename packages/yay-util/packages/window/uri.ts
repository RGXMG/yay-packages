import isString from '../string/isString';
import isObject from '../object/isObject';
import getKeys from '../object/getKeys';
import isArray from '../array/isArray';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
var reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export function isUrl(path) {
    return reg.test(path);
}
/**
 * 如果符合uri格式
 * 使用decodeUriComponent解码uri
 * @param soa {string|object|Array<String>}
 */
export function decodeIfUrl(soa) {
    var handle = function handle(maybeUrl) {
        if (!isString(maybeUrl)) {
            return maybeUrl;
        }
        try {
            return decodeURIComponent(maybeUrl);
        } catch (e) {
            return maybeUrl;
        }
    };
    if (isString(soa)) {
        // @ts-ignore
        return handle(soa);
    }
    if (isObject(soa)) {
        var res = Object.create(null);
        getKeys(soa).forEach(function (key) {
            res[key] = handle(soa[key]);
        });
        return res;
    }
    if (isArray(soa)) {
        // @ts-ignore
        return soa.map(function (i) {
            return handle(i);
        });
    }
    return '';
}