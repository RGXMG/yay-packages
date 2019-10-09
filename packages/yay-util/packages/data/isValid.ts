import isNaN from 'lodash/isNaN';
import hasKv from '../object/hasKv';
import hasEle from '../array/hasEle';
import isObject from '../object/isObject';
/**
 * 验证值是否合法
 * 不合法如下：
 * 1. 数组或者对象不包含任何元素或者属性
 * 2. 等于 '' || undefined || null || NaN
 * @param val
 * @returns {*}
 */
const index = (val: any): boolean => {
  if (Array.isArray(val)) return hasKv(val);
  if (isObject(val)) return hasEle(val);
  return !(val === '' || val === undefined || val === null || isNaN(val));
};
export default index;
