/**
 * base 64
 * @type {{enCode: (function(*=): string), deCode: (function(*=): string)}}
 */
declare const index: {
    enCode: (val: string) => string;
    deCode: (val: string) => string;
};
export default index;
