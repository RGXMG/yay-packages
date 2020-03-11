import hasKv from './hasKv';
import getKeys from './getKeys';
/**
 * 对象{key:{key2: val}, key2: 58}转为数组[{key2: val}, 58]
 * @param obj
 * @returns {*}
 */
const index = (obj: Object) => {
  if (!hasKv(obj)) return [];
  return getKeys(obj).map((k, _) => obj[k]);
};
export default index;
