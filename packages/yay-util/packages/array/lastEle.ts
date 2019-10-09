import len from './len';
/**
 * 获取数组元素最后一个元素
 * @param array
 * @returns {*}
 */
var index = function index(array) {
  return array[len(array) - 1];
};
export default index;