import isArray from './isArray';
/**
 * 数组是否含有元素
 * @param array
 */
function index(array) {
  return isArray(array) ? array.length > 0 : false;
}
export default index;
