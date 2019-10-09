import isArray from './isArray';
import hasEle from './hasEle';

/**
 * 树形结构转为扁平化数据
 * @param data
 * @param opts
 * @returns {*}
 */
function flatten(
  data: Object[],
  opts: {
    childrenKey?: string;
  } = { childrenKey: 'children' }
): Array<Object> {
  const newData = [];
  const findItem = function findItem(d) {
    d.forEach(function(item) {
      if (isArray(item[opts.childrenKey]) && hasEle(item[opts.childrenKey])) {
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
}
export default flatten;
