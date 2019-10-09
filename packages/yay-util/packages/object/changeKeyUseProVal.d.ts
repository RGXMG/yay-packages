/**
 * 对象     { key:{ label: label_val, key2: key2_val } }
 * 转为对象: { key2_val: { label: label_val, key2: key2_val } }
 * @param obj
 * @param key 想要将obj中替换成的key名称
 * @returns {*}
 */
declare const index: (obj: Object, key?: string) => Object;
export default index;
