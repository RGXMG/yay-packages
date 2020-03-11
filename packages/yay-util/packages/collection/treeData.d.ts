interface IOpt<T> {
    key?: string;
    parentKey?: string;
    childrenKey?: string;
    topVal?: number | string | boolean | null | undefined;
    filterCb?: (args: Array<T>) => Array<T>;
    cutCb?: (args: T) => Partial<T>;
}
/**
 * 扁平化数据转为树形结构
 * @param data
 * @param opt {IOpt}
 * @returns {*}
 */
declare function index<T>(data: Array<T>, opt?: IOpt<T>): any[];
export default index;
