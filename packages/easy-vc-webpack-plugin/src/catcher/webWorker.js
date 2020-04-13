import Tool from './tool';
class WebWorker extends Tool {
  constructor(options) {
    super(options);
  }
  static canUse() {
    return typeof Worker !== 'function';
  }
}
export default WebWorker;
