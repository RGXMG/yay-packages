function index(any) {
  return Object.prototype.toString.call(any) === '[object Array]';
}
export default index;
