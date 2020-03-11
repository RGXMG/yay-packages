/**
 * 使用setTimeout模拟setInterval，避免如下问题：
 * 1. loop阻塞，浏览器取消加入异步loop, 导致执行跳过
 * 2. 浏览器实现差异，导致执行间隔时间过短
 * @param handler
 * @param timeout
 * @param args
 */
const index = (handler, timeout, ...args): any => {
  const timer: { value: any; valueOf: () => number } = {
    value: -1,
    valueOf: function() {
      return this.value;
    },
  };
  let callback = () => {
    timer.value = setTimeout(callback, timeout);
    handler.apply(this, args);
  };
  timer.value = setTimeout(callback, timeout);
  return timer;
};
export default index;
