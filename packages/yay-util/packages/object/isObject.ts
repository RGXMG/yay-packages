const index = (any: any): boolean => {
  return Object.prototype.toString.call(any) === '[object Object]';
};
export default index;
