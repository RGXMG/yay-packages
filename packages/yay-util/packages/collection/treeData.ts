import isFunction from '../function/isFunction';
import isArray from '../array/isArray';

interface IOpt<T> {
  // 自身的标识的属性名称，默认为id
  key?: string;
  // 直接父对象标识属性名称，默认为pid
  parentKey?: string;
  // 直接子元素标识属性名称，默认为children
  childrenKey?: string;
  // 顶层父对象自身的标识的值，默认为0
  topVal?: number | string | boolean | null | undefined;
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
  if (!isArray(data)) throw new Error('treeData: data必须为Array<Object>！');
  const defaultOpts = {
    key: 'id',
    parentKey: 'pid',
    childrenKey: 'children',
    topVal: 0,
    cutCb: null,
  };
  const opts = { ...defaultOpts, ...opt };
  // item映射
  const itemKvMap = data.reduce((map, cur) => {
    let nCur = cur;
    if (isFunction(opts.cutCb)) {
      nCur = opts.cutCb(nCur);
    }
    return (map[cur[opts.key]] = nCur), map;
  }, {});
  // 找寻父元素
  data.forEach(item => {
    if (`${item[opts.parentKey]}` !== `${opts.topVal}`) {
      const parentKey = item[opts.parentKey];
      const parentItem = itemKvMap[parentKey];
      if (parentItem) {
        if (!isArray(parentItem[opts.childrenKey])) {
          parentItem[opts.childrenKey] = [];
        }
        parentItem[opts.childrenKey].push(item);
      }
    }
  });
  // filter 顶级元素
  return data.filter(item => `${item[opts.parentKey]}` === `${opts.topVal}`);
}
export default index;
