/**
 * 深度比较两对象
 * @param  {Object} object 等待比较的object
 * @param  {Object} base   要与object比较的base对象
 * @return {Object}        返回新的对象，里面包含比较之后不同的属性值
 */
declare function index(object: Array<any> | Object, base: Array<any> | Object): any;
export default index;
