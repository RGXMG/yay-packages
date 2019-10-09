/**
 * 文件名称操作
 * @type {{getExtension: (function(*): (string | *)), getFullName: (function(*): (string | *))}}
 */
declare const fileName: {
    getExtension: (fn: string) => string;
    getFullName: (fn: string) => string;
};
export { fileName };
