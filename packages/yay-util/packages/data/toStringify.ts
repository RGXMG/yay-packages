/**
 * 将对象转为string形式，用concat连接key和value，用join连接键值对
 * @param obj 对象
 * @param opt 选项 { concat?: key和value用什么连接，default: '=', join?: 键值对用什么连接，default: '&' }
 */
const index = function index(
  obj: Object,
  opt: {
    concat?: string;
    join?: string;
  } = {}
): string {
  const opts = { concat: '=', join: '&', ...opt };
  return Object.keys(obj)
    .map(function(key) {
      return '' + key + opts.concat + obj[key];
    })
    .join(opts.join);
};
export default index;
