/**
 *
 * @param list 集合
 * @param root
 * @param opt
 */
function index<T>(
  list: Array<T>,
  root: ((i: T) => boolean) | string | number,
  opt: {
    correctSym?: ((i: T) => string) | string;
    children?: string;
  } = {}
): Array<T> {
  const opts = { correctSym: 'id', children: 'children', ...opt };
  // 如果为函数调用
  // 返回结果true 不删除
  // 返回结果为false 删除
  const executeValidate =
    typeof root === 'function'
      ? i => root(i)
      : i =>
          `${i[typeof opts.correctSym === 'function' ? opts.correctSym(i) : opts.correctSym]}` !==
          `${root}`;
  const mapItem = function mapItem(l, r, os) {
    return l.filter(function(item) {
      if (executeValidate(item)) {
        if (item[opts.children] && item[opts.children].length) {
          item[opts.children] = mapItem(item[opts.children], r, os);
        }
        return true;
      }
      return false;
    });
  };
  return mapItem(list, root, opts);
}
export default index;
