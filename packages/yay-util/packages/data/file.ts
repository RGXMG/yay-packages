import isString from '../string/isString';
/**
 * 文件名称操作
 * @type {{getExtension: (function(*): (string | *)), getFullName: (function(*): (string | *))}}
 */
const fileName = {
  getExtension: function getExtension(fn: string) {
    if (!isString(fn)) return '';
    return fn.substring(fn.lastIndexOf('.') + 1);
  },
  getFullName: function getFullName(fn: string) {
    if (!isString(fn)) return '';
    return fn.substring(0, fn.lastIndexOf('.'));
  },
};
export { fileName };
