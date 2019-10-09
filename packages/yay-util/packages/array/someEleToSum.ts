import calculation from '../number/calculation';
/**
 * array 累加
 * @param list 数组
 * @param key 属性key
 * @param base 相加的基数
 * @param fixed 保留几位小数
 * @returns {*}
 */
var index = function index(list: any[], key: string, base: number = 0, fixed: number = 2): number {
  const eles = [base, ...list.map(i => i[key] || 0)];
  // @ts-ignore
  return calculation.calculatio(...eles, { fixed: 2 }).plus();
};
export default index;
