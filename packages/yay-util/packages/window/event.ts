export const isMouseEvent = function isMouseEvent(any) {
  return Object.prototype.toString.call(any) === '[object MouseEvent]';
};