/**
 * generator create uuid
 * @param len 长度 默认为10
 * @param radix 混合的基数 默认为20
 */
function index(len: number = 10, radix: number = 20) {
  // 模板字符
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i = void 0;
  radix = radix && (radix > chars.length ? chars.length : radix);
  if (len) {
    // eslint-disable-next-line no-plusplus,no-bitwise
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)];
    }
  } else {
    let r = void 0;
    // eslint-disable-next-line no-multi-assign
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    // eslint-disable-next-line no-plusplus
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        // eslint-disable-next-line no-bitwise
        r = 0 | (Math.random() * 16);
        // eslint-disable-next-line no-bitwise
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}
export default index;
