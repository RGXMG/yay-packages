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
const multilevelKey = {
  isMultilevel: function(k) {
    return k.indexOf('_') > -1;
  },
  isNs: function(str: string) {
    return isString(str) ? str.split('_').length >= 3 : false;
  },
  fieldName: function fieldName(str: string) {
    return isString(str)
      ? this.isNs(str)
        ? str.split('_')[1]
        : str.substring(0, str.indexOf('_'))
      : '';
  },
  namespace: function namespace(str: string) {
    return this.isNs(str) ? str.split('_')[0] : '';
  },
  key: function key(str: string) {
    return isString(str)
      ? this.isNs(str)
        ? str.split('_')[2]
        : str.substring(str.indexOf('_') + 1)
      : '';
  },
  unique: function(name, uid = uuid(), ns = '') {
    if (!name) throw new Error('multilevelKey _> unique : name is required');
    return (ns ? ns + '_' : '') + name + '_' + uid;
  },
  combination(obj = {}, name = 'data') {
    if (!hasKv(obj)) return [];
    const trackMap = new Map();
    const nsObj = {};
    const othersObj = {};
    for (const [k, v] of Object.entries(obj)) {
      // 存在其他非multilevelKey值
      if (!this.isMultilevel(k)) {
        othersObj[k] = v;
        continue;
      }
      const ns = this.namespace(k);
      let tm = trackMap;
      if (ns) {
        tm = nsObj[ns] ? nsObj[ns] : (nsObj[ns] = new Map());
      }
      const id = this.key(k);
      const temp = { id, [this.fieldName(k)]: v };
      if (tm.has(id)) {
        tm.set(id, {
          ...tm.get(id),
          ...temp,
        });
      } else tm.set(id, temp);
    }
    function handleMapValues(map) {
      const res = [];
      for (const i of map.values()) {
        res.push(i);
      }
      return res;
    }
    let defaultRes = [];
    if (trackMap.size) {
      defaultRes = handleMapValues(trackMap);
    }
    if (hasKv(nsObj)) {
      for (const k in nsObj) {
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
/**
 * inputNumber props
 * @type {{price: {formatter: (function(*): string), parser: (function(*): *)}}}
 */
const inputNumberProps = {
  price: {
    formatter: (value: any, hasSpace: boolean = true) => {
      if (!value) return value;
      return (hasSpace ? '\uFFE5 ' + value : '\uFFE5' + value).replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      );
    },
    parser: (value: string) => value.replace(/￥\s?|(,*)/g, ''),
  },
  percent: {
    formatter: value => (value ? `${value}%` : value),
    parser: value => value.replace('%', ''),
  },
  kilometres: {
    parser: (value: string) => (value ? value.replace(/km\s?|(,*)/g, '') : value),
    formatter: value => {
      return 'km ' + value;
    },
  },
};
/**
 * 选择框常用props
 * @type {{filterOption: (function(*, *): boolean)}}
 */
const selectProps = {
  openSearch: {
    showSearch: true,
    filterOption: (input: string, option: any) =>
      option.props.children
        .toString()
        .toLowerCase()
        .indexOf(input.toLowerCase()) >= 0,
  },
};
/**
 * 常用style
 * @type {{full: {width: string}}}
 */
const fieldCommonStyle = {
  full: { width: '100%' },
  combination: function combination(...style: any[]): Object {
    const styles = {};
    const _loop = function(s) {
      if (isObject(s)) {
        getKeys(s).forEach(function(key) {
          styles[key] = s[key];
        });
      }
    };
    for (const s of style) {
      _loop(s);
    }
    return styles;
  },
};
const multilevelKeyBindThis = {};
for (const k in multilevelKey) {
  if (multilevelKey.hasOwnProperty(k)) {
    multilevelKeyBindThis[k] = multilevelKey[k].bind(multilevelKey);
  }
}
const antd = {
  multilevelKey: multilevelKeyBindThis,
  fieldCommonStyle: fieldCommonStyle,
  inputNumberProps: inputNumberProps,
  selectProps: selectProps,
};
export { antd };
