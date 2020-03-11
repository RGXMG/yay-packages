const _typeof =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? obj => Object.prototype.toString.call(obj)
    : obj =>
        typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
          ? '[object Symbol]'
          : Object.prototype.toString.call(obj);
const index = (any: any): boolean => {
  return _typeof(any) === '[object Object]';
};
export default index;
