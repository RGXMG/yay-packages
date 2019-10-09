/**
 * 将对象转为string形式，用concat连接key和value，用join连接键值对
 * @param obj 对象
 * @param opts 选项 { concat: key和value用什么连接，默认为 =, join: 键值对用什么连接，默认为'&' }
 */
declare const index: (obj: Object, opts?: {
    concat: string;
    join: string;
}) => string;
export default index;
