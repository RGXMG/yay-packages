import isArray from '../array/isArray';
import hasEle from '../array/hasEle';
import isObject from '../object/isObject';

/**
 * 树形结构转为扁平化数据
 * @param data
 * @param opts {Object} value: { childrenKey: string }, default:{ childrenKey: 'children' }
 * @returns {*}
 */
const flatten = function(
  data: Object[],
  opts: {
    childrenKey?: string;
  } = { childrenKey: 'children' }
): Array<Object> {
  if (!isArray(data)) {
    throw new Error('flatten: data必须是Array<Object>！');
  }
  const newData = [];
  const findItem = function findItem(d) {
    d.forEach(function(item) {
      if (isObject(item) && isArray(item[opts.childrenKey]) && hasEle(item[opts.childrenKey])) {
        const obj = { ...item };
        delete obj[opts.childrenKey];
        newData.push(obj);
        findItem(item[opts.childrenKey]);
      } else {
        newData.push(item);
      }
    });
  };
  findItem(data);
  return newData;
};
export default flatten;
