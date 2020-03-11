import isArray from './isArray';
/**
 * 是否为数组
 * @param array
 */
const index = array => {
  if (!isArray(array)) return 0;
  return array.length;
};
export default index;
