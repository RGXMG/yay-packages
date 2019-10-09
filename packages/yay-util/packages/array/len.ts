import isArray from './isArray';
/**
 * 是否为数组
 * @param array
 */
var index = function index(array) {
  return isArray(array) ? array.length : undefined;
};
export default index;