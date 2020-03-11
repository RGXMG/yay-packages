import isArray from './isArray';
/**
 * 数组是否含有元素
 * @param array
 * @param ignoreEmpty {boolean} 忽略empty，default为true
 */
const index = (array: Array<any>, ignoreEmpty: boolean = true) => {
  if (!isArray(array)) return false;
  let notEmpty = false;
  if (!ignoreEmpty) {
    array.map(() => {
      notEmpty = true;
    });
    if (!notEmpty) return false;
  }
  return array.length > 0;
};
export default index;
