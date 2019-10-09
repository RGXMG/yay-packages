/**
 * 验证身份证号码
 * @param idCard
 */
const validateIdCard = function validateIdCard(idCard: string): boolean {
  // 15位和18位身份证号码的正则表达式
  const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  // 没有通过验证 返回false
  if (!regIdCard.test(idCard)) return false;
  // 15位，第一代身份证
  if (idCard.length !== 18) return true;
  // 将前17位加权因子保存在数组里
  const idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
  const idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  // 用来保存前17位各自乖以加权因子后的总和
  let idCardWiSum = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 17; i++) {
    idCardWiSum = Number(idCard.substring(i, i + 1)) * idCardWi[i];
  }
  // 计算出校验码所在数组的位置
  const idCardMod = idCardWiSum % 11;
  // 得到最后一位身份证号码
  const idCardLast = idCard.substring(17);
  // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
  return parseInt(String(idCardMod), 10) === 2
    ? '' + idCardLast === 'X' || '' + idCardLast === 'x' // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
    : '' + idCardLast === '' + idCardY[idCardMod];
};
export { validateIdCard };
