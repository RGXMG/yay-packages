/**
 * 首字母大写
 * @param str
 * @returns {string}
 */
var index = function index(str) {
  return str.toLowerCase().replace(/(\s|^)[a-z]/g, function (char) {
    return char.toUpperCase();
  });
};
export default index;