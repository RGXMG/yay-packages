/**
 * 过滤掉文本格式符 \r \n
 * 过滤掉<script>标签
 * 默认处理textArea中的换行符 替换成<br/>
 * @param val{string}
 * @param rep{string} 要替换的内容
 * @returns {*}
 */
declare const index: (val: string, rep?: string) => string;
export default index;
