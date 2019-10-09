/**
 * 安全的取值
 * 支持与预先定义宿主和默认值进行取值
 * 预先定义宿主 就返回一个function
 * 预先定义宿主时可以传选传统一的默认值
 * 即使定义了统一的默认值, 依旧可以在使用时第二参数传入此项的默认值
 * 不预先定义宿主 传入三个参数
 * (host: {Object}对象宿主,
 * key/keys: {Array|String}想依次取得的key值
 * defaultV: {any}没有完成取值操作的默认值)
 * @returns {Function}
 */
declare const index: () => any;
export default index;
