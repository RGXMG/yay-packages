const fs = require('fs-extra');
const fileManager = require('./fileMannger');
module.exports = class EasyRouter {
  constructor(projectName, config) {
    this.cwd = process.cwd();
    this.config = config || this.getConfig();
    this.entry = void 0;
    this.parseConfig(projectName);
    this.start();
  }

  getConfig() {
    const config = require(`${this.cwd}/easyrouter.config.js`);
    console.log('config:::', config);
    return config;
  }

  parseConfig(name) {
    this.entry = this.config.entryPathResolved[name];
    console.log('this.entry::::', this.entry);
  }

  start() {
    fileMannger();
    fs.readdir(this.entry, (err, info) => {
      console.log('info::', info);
      // this.
    });
  }
};
