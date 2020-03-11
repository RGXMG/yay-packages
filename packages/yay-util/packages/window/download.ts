/**
 * a 标签文件下载
 * @param url
 * @param name
 */
const index = function index(url: string, name: string = '') {
  // 创建a标签进行下载
  const a = document.createElement('a');
  a.id = 'fileDownload';
  a.download = name;
  a.href = url;
  document.body.appendChild(a);
  // 执行下载操作
  const click = new MouseEvent('click');
  document.getElementById('fileDownload').dispatchEvent(click);
  // 删除下载过后的document - a
  document.body.removeChild(a);
};
export default index;
