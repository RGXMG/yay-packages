/**
 * 首字母大写
 * @param str
 * @returns {string}
 */
const index = function index(str: string) {
  return str.replace(/(\s|^)[a-z]/g, function(char) {
    return char.toUpperCase();
  });
};
export default index;
