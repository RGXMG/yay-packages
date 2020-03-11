import calculation from '../number/calculation';
/**
 * array 累加
 * @param list 数组
 * @param key 属性key
 * @param base 相加的基数
 * @param fixed 保留几位小数
 * @returns {*}
 */
const index = (list: any[], key: string, base: number = 0, fixed: number = 2): number => {
  // @ts-ignore
  return calculation.calculatio(...[base, ...list.map(i => i[key] || 0)], { fixed: 2 }).plus();
};
export default index;
