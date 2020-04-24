import WebWorker from './webWorker';
import Jsonp from './jsonp';
class Catcher {
  constructor(options) {
    const { mode, address } = options;
    this.tool = null;
    this.mode = mode;
    this.address = address;
    this.init(mode);
  }

  init(mode) {
    const options = { address: this.address, handler: this.handleReport };
    if (mode === 'webWorker' && WebWorker.canUse()) {
      this.tool = new WebWorker(options);
    } else {
      this.tool = new Jsonp(options);
    }
    this.tool.worker();
  }

  handleReport(version) {
    console.log(version);
  }
}
window.easyVcCatcher = Catcher;
