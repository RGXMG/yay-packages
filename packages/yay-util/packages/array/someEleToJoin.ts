import isArray from './isArray';
import isFunction from '../function/isFunction';
/**
 * 将每一数组的元素中的某个属性按照sym相连接
 * @param array
 * @param pro {string} 具体元素
 * @param sym {string} 连接的符号
 * @param itemCb {Function} 回调函数，传入item、index、array
 *        再该回调函数中，可以更改item[pro]值，之后将其更改好的新的item返回
 * @returns {*}
 */
function index(
  array: Array<any>,
  pro: string = 'label',
  sym: string = '、',
  itemCb: (item: any, i: number, array: Array<any>) => void
) {
  if (!isArray(array)) return null;
  return array
    .map((item, i) => (isFunction(itemCb) ? itemCb(item, i, array) : item)[pro])
    .join(sym);
}
export default index;
