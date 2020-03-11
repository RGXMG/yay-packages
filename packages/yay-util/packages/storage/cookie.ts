import connectEveryProperty from '../object/connectEveryProperty';
/**
 * 设置cookie值
 * @param name cookie name
 * @param value cookie value
 * @param opts cookie的其他设置，如 path、expires等
 * @returns {string}
 */
const setCookie = function setCookie(name: string, value: string, opts: Object) {
  document.cookie = connectEveryProperty({ [name]: value, ...opts });
};
/**
 * 通过正则匹配单次读取cookie的值
 * @param name cookie name
 * @returns {string}
 */
const getCookie = function getCookie(name: string) {
  const res = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
  return res && res[2];
};
/**
 * 通过正则匹配单次删除cookie的值
 * @param name
 * @param opts domain
 */
const delCookie = function delCookie(name: string, opts: object) {
  const defaultOpts = { domain: document.domain, path: '/' };
  const exp = new Date();
  exp.setTime(exp.getTime() - 36e4 * 24);
  const cval = getCookie(name);
  if (cval)
    setCookie(name, cval, {
      expires: exp.toUTCString(),
      domain: defaultOpts.domain,
      path: defaultOpts.path,
      ...opts,
    });
};
export default {
  setCookie: setCookie,
  getCookie: getCookie,
  delCookie: delCookie,
};
