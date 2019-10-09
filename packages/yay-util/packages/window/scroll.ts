/**
 * 滚动到某个位置
 * @param opts
 */
var scrollTo = function scrollTo(opts) {
  window.scrollTo(opts);
};
/**
 * 滚动到X位置
 * @param x
 * @param behavior 表现
 * @returns {*}
 */
var scrollToX = function scrollToX() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var behavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'smooth';
  return scrollTo({ behavior: behavior, left: x - 0 });
};
/**
 * 滚动到Y位置
 * @param y
 * @param behavior
 * @returns {*}
 */
var scrollToY = function scrollToY() {
  var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var behavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'smooth';
  return scrollTo({ behavior: behavior, top: y - 0 });
};
export { scrollTo, scrollToX, scrollToY };