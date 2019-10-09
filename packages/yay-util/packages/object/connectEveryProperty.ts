import isObject from './isObject';
/**
 * 将obj用特定符号连接
 * @param obj  待操作的object
 * @param splitSymKv
 * @param splitSymItem
 * @returns {string}
 */
const index = (obj: Object, splitSymKv: string = '=', splitSymItem: string = ';') => {
  if (!obj || !isObject) return '';
  return Object.keys(obj).reduce(function(pre, next) {
    pre += '' + next + splitSymKv + obj[next] + splitSymItem;
    return pre;
  }, '');
};
export default index;
