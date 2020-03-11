import isArray from '../array/isArray';

/**
 * 根据配置项找到正确的item 只能用于编辑
 * 如果匹配了父项，就不会再去查找子项
 * 1. 直接添加obj数据
 * 2. 回调
 * @param list
 * @param root：{ string |function } 比较的凭据，函数返回true
 * @param cb：比较成功之后的回调函数
 * @param opt {
 *   correctSym:{string|function} 正确项的匹配值, 可以由该函数返回  默认id
 *   children: 下一级的字段名
 *   type: m:多个，会遍项历所有的， s：如果找到一项，就不再查找子项
 * }
 * @returns {Array}
 */
function index<T>(
  list: Array<T>,
  root: ((i: T) => boolean) | string,
  cb: (i: T) => Partial<T>,
  opt: {
    correctSym?: ((i: T) => string) | string;
    children?: string;
    type?: 'm' | 's';
  } = {}
): Array<Partial<T>> {
  if (!isArray(list)) {
    throw new Error('editItem: list必须是Array<Object>！');
  }
  const opts = { correctSym: 'id', children: 'children', type: 's', ...opt };
  // opt.type === s 时，使用
  let done = false;
  // 如果为函数调用
  // 期望root()返回结果true 才会进行编辑操作
  const executeValidate =
    typeof root === 'function'
      ? i => root(i)
      : i =>
          `${i[typeof opts.correctSym === 'function' ? opts.correctSym(i) : opts.correctSym]}` ===
          `${root}`;
  let hasChildren = void 0;
  const mapItemOfType =
    opts.type === 'm'
      ? function(i, r, c, os) {
          // 先判断是否具有子项
          const item = hasChildren(i, r, c, os);
          // 执行验证
          if (executeValidate(item)) {
            return c(item, list);
          }
          return item;
        }
      : function(i, r, c, os) {
          // 先执行验证
          if (executeValidate(i)) {
            done = true;
            return c(i, list);
          }
          return hasChildren(i, r, c, os);
        };
  const mapItem = function mapItem(l, r, c, os) {
    return l.map(function(item) {
      // 已完成 直接返回item
      if (done) return item;
      return mapItemOfType(item, r, c, os);
    });
  };
  hasChildren = function hasChildren(item, r, c, os) {
    if (item[opts.children] && item[opts.children].length) {
      return {
        ...item,
        [opts.children]: mapItem(item[opts.children], r, c, os),
      };
    }
    return item;
  };
  return mapItem(list, root, cb, opts);
}
export default index;
