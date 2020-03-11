/**
 * 树形结构转为扁平化数据
 * @param data
 * @param opts
 * @returns {*}
 */
declare const flatten: (data: Object[], opts?: {
    childrenKey?: string;
}) => any;
export default flatten;
