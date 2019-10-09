import hasKv from './hasKv';
import getKeys from './getKeys';
/**
 * 对象{ key:value,key2: value2 }转为数组 [{key: value}, {key2: value2}]
 * @param obj
 * @returns {*}
 */
const index = (obj: Object): Object[] => {
  if (!hasKv(obj)) return [];
  return getKeys(obj).map((key, _, obj) => ({ [key]: obj[key] }));
};
export default index;
