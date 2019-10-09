import isArray from '../array/isArray';
import isObject from '../object/isObject';
const index = (any: any) => isObject(any) || isArray(any);
export default index;
