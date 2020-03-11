import isFunction from '../function/isFunction';
import isArrary from '../array/isArray';

interface IOpt<T> {
  // 自身的标识的属性名称，默认为id
  key?: string;
  // 直接父对象标识属性名称，默认为pid
  parentKey?: string;
  // 直接子元素标识属性名称，默认为children
  childrenKey?: string;
  // 顶层父对象自身的标识的值，默认为0
  topVal?: number | string | boolean | null | undefined;
  // 提供一个方法，进行筛选整个data
  filterCb?: (args: Array<T>) => Array<T>;
  // 当遍历每一个对象时，该方法可以删除或者增加属性
  cutCb?: (args: T) => Partial<T>;
}

/**
 * 扁平化数据转为树形结构
 * @param data
 * @param opt
 * @returns {*}
 */
function index<T>(data: Array<T>, opt?: IOpt<T>): Object[] {
  if (!isArrary(data)) throw new Error('treeData: data必须为Array<Object>！');
  const defaultOpts = {
    key: 'id',
    parentKey: 'pid',
    childrenKey: 'children',
    topVal: 0,
    filterCb: null,
    cutCb: null,
  };
  const opts = { ...defaultOpts, ...opt };
  const childArr = [];
  const parentArr = [];
  // 分开顶级节点以及其所有子节点
  (isFunction(opts.filterCb) ? opts.filterCb(data) : data).forEach(function(item) {
    let newItem = item;
    if (isFunction(opts.cutCb)) newItem = opts.cutCb(item);
    if (newItem[opts.parentKey] !== opts.topVal) {
      childArr.push(newItem);
    } else parentArr.push(newItem);
  });
  /**
   * 找到当前对象的最底层的children
   * @param obj
   * @param cb
   */
  const findLastChild = function findLastChild(obj, cb) {
    if (obj[opts.childrenKey]) {
      obj[opts.childrenKey].forEach(function(item) {
        return findLastChild(item, cb);
      });
    }
    cb(obj);
  };
  /**
   * 为顶层父元素插入子元素
   * @param init
   * @returns {*}
   */
  const insertChild = function insertChild(init) {
    return childArr.reduce(function(total, cur, i) {
      let isInsert = false;
      findLastChild(total, function(obj) {
        if (obj[opts.key] === cur[opts.parentKey]) {
          obj[opts.childrenKey] = obj[opts.childrenKey]
            ? [].concat(obj[opts.childrenKey], [cur])
            : [cur];
          isInsert = true;
        }
      });
      if (i === data.length && isInsert) insertChild(total);
      return total;
    }, init);
  };
  return parentArr.map(function(parent) {
    return insertChild(parent);
  });
}
export default index;
