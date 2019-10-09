import isObject from './isObject';

const index = (obj: Object): string[] => {
  return isObject(obj) ? Object.keys(obj) : [];
};
export default index;
