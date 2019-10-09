/**
 * base 64
 * @type {{enCode: (function(*=): string), deCode: (function(*=): string)}}
 */
const index = {
  enCode: function enCode(val: string) {
    return window.btoa(val);
  },
  deCode: function deCode(val: string) {
    return window.atob(val);
  },
};
export default index;
