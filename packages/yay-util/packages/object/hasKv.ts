import isObject from './isObject';
const index = (obj: Object): boolean => (isObject(obj) ? Object.keys(obj).length > 0 : false);
export default index;
