/**
 * 验证值是否合法
 * 不合法如下：
 * 1. 数组或者对象不包含任何元素或者属性
 * 2. 等于 '' || undefined || null || NaN
 * @param val
 * @returns {*}
 */
declare const index: (val: any) => boolean;
export default index;
