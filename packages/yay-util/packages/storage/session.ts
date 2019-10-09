/**
 * 从sessionStorage中获取item
 * @param key
 */
var getSession = function getSession(key) {
  return JSON.parse(sessionStorage.getItem(key));
};
/**
 * 根据key和val设置一个session
 * @param key
 * @param val
 */
var setSession = function setSession(key, val) {
  return sessionStorage.setItem(key, JSON.stringify(val));
};
export default {
  getSession: getSession,
  setSession: setSession
};