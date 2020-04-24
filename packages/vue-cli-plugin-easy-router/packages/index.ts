const fs = require('fs-extra');
const FileManager = require('./fileManager');

interface IEntryItem {
  [key: string]: string;
}
interface IOutput {
  path: string;
  filename: string;
}
interface IConfig {
  entryPathResolved: IEntryItem;
  output: IOutput;
}
module.exports = class EasyRouter {
  cwd: string;
  config: IConfig;
  entry: string;
  constructor(projectName: string, config: IConfig) {
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
    const fileManager = new FileManager(this.entry);
    fs.readdir(this.entry, (err, info) => {
      console.log('info::', info);
      // this.
    });
  }
};
