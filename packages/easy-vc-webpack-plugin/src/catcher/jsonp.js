import Tool from './tool';
class Jsonp extends Tool {
  static INTERFACE_NAME = '_easyVcJsonp';
  constructor(options) {
    super(options);
    this.address = options.address;
    this.init();
  }
  start() {
    this.createScript();
  }
  createInterface() {
    if (window[Jsonp.INTERFACE_NAME]) {
      console.error(`window上原有的${Jsonp.INTERFACE_NAME}属性已经被覆盖`);
    }
    window[Jsonp.INTERFACE_NAME] = this.validator;
  }
  createScript() {
    const script = document.createElement('script');
    script.src = this.address;
    script.onload = this.catchDone;
    document.body.appendChild(script);
  }
  catchDone() {
    super.setFulfilled();
  }
}
export default Jsonp;
