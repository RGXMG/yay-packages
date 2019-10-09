/**
 * a 标签文件下载
 * @param url
 * @param name
 */
var index = function index(url) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    // 创建a标签进行下载
    var a = document.createElement('a');
    a.id = 'fileDownload';
    a.download = name;
    a.href = url;
    document.body.appendChild(a);
    // 执行下载操作
    var click = new MouseEvent('click');
    document.getElementById('fileDownload').dispatchEvent(click);
    // 删除下载过后的document - a
    document.body.removeChild(a);
};
export default index;