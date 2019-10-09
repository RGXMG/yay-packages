import transform from 'lodash/transform';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
/**
 * 深度比较两对象
 * @param  {Object} object 等待比较的object
 * @param  {Object} base   要与object比较的base对象
 * @return {Object}        返回新的对象，里面包含比较之后不同的属性值
 */
const index = (object: Array<any> | Object, base: Array<any> | Object) => {
  function changes(object, base) {
    return transform(object, function(result, value, key) {
      if (!isEqual(value, base[key])) {
        result[key] = isObject(value) && isObject(base[key]) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
};
export default index;
