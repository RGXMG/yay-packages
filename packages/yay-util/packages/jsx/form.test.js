import isString from '../string/isString';
import isObject from '../object/isObject';
import getKeys from '../object/getKeys';
import hasKv from '../object/hasKv';
import uuid from '../data/uuid';
/**
 * 多次表单项名字的取值
 * 取字段名
 * 取字段key
 * 组合字段名以及key值
 * @type {{fieldName: (function(*): (string | *)), key: (function(*): (string | *))}}
 */
var multilevelKey = {
  isMultilevel: function isMultilevel(k) {
    return k.indexOf('_') > -1;
  },
  isNs: function(str) {
    return isString(str) ? str.split('_').length >= 3 : false;
  },
  fieldName: function fieldName(str) {
    return isString(str)
      ? this.isNs(str)
        ? str.split('_')[1]
        : str.substring(0, str.indexOf('_'))
      : '';
  },
  namespace: function namespace(str) {
    return this.isNs(str) ? str.split('_')[0] : '';
  },
  key: function key(str) {
    return isString(str)
      ? this.isNs(str)
        ? str.split('_')[2]
        : str.substring(str.indexOf('_') + 1)
      : '';
  },
  unique: function unique(name) {
    var uid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : uuid();
    var ns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    if (!name) throw new Error('multilevelKey _> unique : name is required');
    return (ns ? ns + '_' : '') + name + '_' + uid;
  },
  combination: function combination() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'data';

    if (!hasKv(obj)) return [];

    var trackMap = new Map();
    var nsObj = {};
    var othersObj = {};
    for (
      var _iterator = Object.entries(obj),
        _isArray = Array.isArray(_iterator),
        _i = 0,
        _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
      ;

    ) {
      var _temp;

      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var _ref = _ref2;
      var k = _ref[0];
      var v = _ref[1];

      // 存在其他非multilevelKey值
      if (!this.isMultilevel(k)) {
        othersObj[k] = v;
        continue;
      }
      var ns = this.namespace(k);
      var tm = trackMap;
      if (ns) {
        tm = nsObj[ns] ? nsObj[ns] : (nsObj[ns] = new Map());
      }
      var id = this.key(k);
      var temp = ((_temp = { id: id }), (_temp[this.fieldName(k)] = v), _temp);
      if (tm.has(id)) {
        tm.set(id, Object.assign(Object.assign({}, tm.get(id)), temp));
      } else tm.set(id, temp);
    }
    function handleMapValues(map) {
      var res = [];
      for (
        var _iterator2 = map.values(),
          _isArray2 = Array.isArray(_iterator2),
          _i2 = 0,
          _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();
        ;

      ) {
        var _ref3;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref3 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref3 = _i2.value;
        }

        var i = _ref3;

        res.push(i);
      }
      return res;
    }
    var defaultRes = [];
    if (trackMap.size) {
      defaultRes = handleMapValues(trackMap);
    }
    if (hasKv(nsObj)) {
      for (var k in nsObj) {
        if (nsObj.hasOwnProperty(k)) {
          nsObj[k] = handleMapValues(nsObj[k]);
        }
      }
    }
    if (hasKv(othersObj)) {
      return Object.assign({}, othersObj, nsObj, defaultRes.length ? { [name]: defaultRes } : {});
    }
    return hasKv(nsObj)
      ? Object.assign(nsObj, defaultRes.length ? { [name]: defaultRes } : {})
      : defaultRes;
  },
};
var multilevelKeyBindThis = {};
for (var k in multilevelKey) {
  if (multilevelKey.hasOwnProperty(k)) {
    multilevelKeyBindThis[k] = multilevelKey[k].bind(multilevelKey);
  }
}
var antd = {
  multilevelKey: multilevelKeyBindThis,
};
export { antd };
