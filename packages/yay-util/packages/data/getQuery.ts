/**
 * 获取query参数
 * @param query
 * @param par
 * @returns {null}
 */
function index<T>(query: string = '', par: string = ''): T {
  let realQuery = query || window.location.search;
  // 如果为空 返回一个空对象
  if (!realQuery) return Object.create(null);
  // 去掉？
  if (realQuery.indexOf('?') > -1) realQuery = realQuery.slice(1);
  if (!realQuery) return Object.create(null);
  const arrByCon = realQuery.split('&');
  const resObj = Object.create(null);
  for (const item of arrByCon) {
    const keyVal = item.split('=');
    // eslint-disable-next-line prefer-destructuring
    resObj[keyVal[0]] = keyVal[1];
  }
  if (!par) return resObj;
  return resObj[par] ? resObj[par] : {};
}
export default index;
