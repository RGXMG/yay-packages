import len from './len';
import isArray from './isArray';
/**
 * 获取数组元素最后一个元素
 * @param array
 * @returns {*}
 */
const index = array => {
  if (!isArray(array)) return false;
  return array[len(array) - 1];
};
export default index;
