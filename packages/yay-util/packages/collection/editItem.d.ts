/**
 * 根据配置项找到正确的item 只能用于编辑
 * 如果匹配了父项，就不会再去查找子项
 * 1. 直接添加obj数据
 * 2. 回调
 * @param list
 * @param root：{ string |function } 比较的凭据，函数返回true
 * @param cb：比较成功之后的回调函数
 * @param opt {
 *   correctSym:{string|function} 正确项的匹配值, 可以由该函数返回  默认id
 *   children: 下一级的字段名, 默认children
 *   type: m:多个，会遍项历所有的， s：如果找到一项，就不再查找子项 默认s
 * }
 * @returns {Array}
 */
declare function index<T>(list: Array<T>, root: ((i: T) => boolean) | string, cb: (i: T) => Partial<T>, opt?: {
    correctSym?: ((i: T) => string) | string;
    children?: string;
    type?: 'm' | 's';
}): Array<Partial<T>>;
export default index;
