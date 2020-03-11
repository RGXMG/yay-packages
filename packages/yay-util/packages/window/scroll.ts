interface IOpts {
  left?: number;
  top?: number;
  behavior: 'auto' | 'smooth';
}

/**
 * 滚动到某个位置
 * @param opts
 */
const scrollTo = function scrollTo(opts: IOpts) {
  window.scrollTo(opts);
};
/**
 * 滚动到X位置
 * @param x
 * @param behavior 表现
 * @returns {*}
 */
const scrollToX = function scrollToX(x: number = 0, behavior: 'auto' | 'smooth' = 'smooth') {
  return scrollTo({ behavior: behavior, left: x - 0 });
};
/**
 * 滚动到Y位置
 * @param y
 * @param behavior
 * @returns {*}
 */
const scrollToY = function scrollToY(y: number = 0, behavior: 'auto' | 'smooth' = 'smooth') {
  return scrollTo({ behavior: behavior, top: y - 0 });
};
export { scrollTo, scrollToX, scrollToY };
