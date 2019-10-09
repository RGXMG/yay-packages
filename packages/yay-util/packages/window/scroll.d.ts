interface IOpts {
    left?: number;
    top?: number;
    behavior: 'auto' | 'smooth';
}
/**
 * 滚动到某个位置
 * @param opts
 */
declare const scrollTo: (opts: IOpts) => void;
/**
 * 滚动到X位置
 * @param x
 * @param behavior 表现
 * @returns {*}
 */
declare const scrollToX: (x?: number, behavior?: "auto" | "smooth") => void;
/**
 * 滚动到Y位置
 * @param y
 * @param behavior
 * @returns {*}
 */
declare const scrollToY: (y?: number, behavior?: "auto" | "smooth") => void;
export { scrollTo, scrollToX, scrollToY };
