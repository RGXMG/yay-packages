import getKeys from './getKeys';
import isObject from './isObject';
const index = (any: any, key: string) => isObject(any) && getKeys(any).includes(key);
export default index;
