var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import connectEveryProperty from '../object/connectEveryProperty';
/**
 * 设置cookie值
 * @param name cookie name
 * @param value cookie value
 * @param opts cookie的其他设置，如 path、expires等
 * @returns {string}
 */
var setCookie = function setCookie(name, value, opts) {
    var _extends2;

    document.cookie = connectEveryProperty(_extends((_extends2 = {}, _extends2[name] = value, _extends2), opts));
};
/**
 * 通过正则匹配单次读取cookie的值
 * @param name cookie name
 * @returns {string}
 */
var getCookie = function getCookie(name) {
    var res = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
    return res && res[2];
};
/**
 * 通过正则匹配单次删除cookie的值
 * @param name
 * @param opts domain
 */
var delCookie = function delCookie(name, opts) {
    var defaultOpts = _extends({ domain: document.domain, path: '/' }, opts);
    var exp = new Date();
    exp.setTime(exp.getTime() - 36e4 * 24);
    var cval = getCookie(name);
    if (cval) setCookie(name, cval, {
        expires: exp.toUTCString(),
        domain: defaultOpts.domain,
        path: defaultOpts.path
    });
};
export default {
    setCookie: setCookie,
    getCookie: getCookie,
    delCookie: delCookie
};