import isArray from '../array/isArray';
/**
 * 将集合类对象展开为一个对象
 * 后面的属性将会覆盖前面
 * @param array
 */
const index = (array: Object[]): Object => {
  if (!isArray(array)) {
    throw new Error('flatCollection need Array collection, but arguments type is not correct');
  }
  return array.reduce((pre, next) => ({ ...pre, ...next }));
};
export default index;
