import versionInfo from './version';
class Tool {
  constructor(options) {
    this.address = options.address;
    this.failedCallback = options.failedCallback;
    this.TOOL_STATUS = {
      FREED: 'FREED',
      PENDING: 'PENDING',
      FULFILLED: 'FULFILLED',
      REJECTED: 'REJECTED',
      LOCKED: 'LOCKED'
    };
    this.status = this.TOOL_STATUS.FREED;
  }
  validator(version) {
    if (version !== versionInfo.version) {
      this.failedCallback(version);
    }
  }
  worker() {
    if (this.status === this.TOOL_STATUS.LOCKED) return;
    this.start();
    this.status = this.TOOL_STATUS.LOCKED;
  }
  setFulfilled() {
    this.status = this.TOOL_STATUS.FULFILLED;
  }
  setPending() {
    this.status = this.TOOL_STATUS.PENDING;
  }
  isFreed() {
    return this.status === this.TOOL_STATUS.FREED;
  }
  isPending() {
    return this.status === this.TOOL_STATUS.PENDING;
  }
}
export default Tool;
