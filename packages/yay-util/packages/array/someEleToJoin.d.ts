/**
 * 将每一数组的元素中的某个属性按照sym相连接
 * @param array
 * @param pro
 * @param sym
 * @param itemCb
 * @returns {*}
 */
declare function index(array: Array<any>, pro: string, sym: string, itemCb: (item: any, i: number, array: Array<any>) => void): string;
export default index;
