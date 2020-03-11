/**
 * 从sessionStorage中获取item
 * @param key
 */
const getSession = function getSession(key: string): any {
  return JSON.parse(sessionStorage.getItem(key));
};
/**
 * 根据key和val设置一个session
 * @param key
 * @param val
 */
const setSession = function setSession(key: string, val: any) {
  return sessionStorage.setItem(key, JSON.stringify(val));
};
export default {
  getSession: getSession,
  setSession: setSession,
};
