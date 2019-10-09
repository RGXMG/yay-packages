import isString from '../string/isString';
import isObject from '../object/isObject';
import getKeys from '../object/getKeys';
/**
 * 多次表单项名字的取值
 * 取字段名
 * 取字段key
 * @type {{fieldName: (function(*): (string | *)), key: (function(*): (string | *))}}
 */
const multilevelKey = {
  fieldName: function fieldName(str: string) {
    return isString(str) ? str.substring(0, str.indexOf('_')) : '';
  },
  key: function key(str: string) {
    return isString(str) ? str.substring(str.indexOf('_') + 1) : '';
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
const antd = {
  multilevelKey: multilevelKey,
  fieldCommonStyle: fieldCommonStyle,
  inputNumberProps: inputNumberProps,
  selectProps: selectProps,
};
export { antd };
