const index = function(any) {
  return Object.prototype.toString.call(any) === '[object Function]';
};
export default index;
