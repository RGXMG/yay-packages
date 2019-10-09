import isObject from './isObject';
import hasKv from './hasKv';
import getKeys from './getKeys';
/**
 * 对象obj    { key:{ label: label_val, key2: key2_val } }
 * 当key: 'key2'
 * 转为的对象: { key2_val: { label: label_val, key2: key2_val } }
 * @param obj
 * @param key 想要将obj中替换成的key名称
 * @returns {*}
 */
const index = (obj: Object, key: string = 'key') => {
  if (!isObject(obj) || !hasKv(obj)) return {};
  const res = {};
  getKeys(obj).forEach(function(k) {
    res[obj[k][key]] = obj[k];
  });
  return res;
};
export default index;
