const { identityPromisify } = require('../utils');
const { promisify } = require('util');
const fs = require('fs-extra');

class FileMannger {
  constructor(path) {
    this.path = path;
  }

  async getDirLs() {
    try {
      return await promisify(fs.readdir)(this.path);
    } catch (e) {
      throw new Error(e);
    }
  }

  async dirIsExisted(path) {
    try {
      const stat = await promisify(fs.stat)(path);
      return stat.isDirectory();
    } catch (e) {
      throw new Error(e);
    }
  }

  async fileIsExisted(path) {
    try {
      const stat = await promisify(fs.stat)(path);
      return !stat.isDirectory();
    } catch (e) {
      throw new Error(e);
    }
  }

  async createDir(path) {
    try {
      await fs.ensureDir(path);
    } catch (e) {
      throw new Error(e);
    }
  }

  async createFile(path, content) {
    try {
      await fs.ensureFile(path);
      await fs.outputFile(path, content);
    } catch (e) {
      throw new Error(e);
    }
  }

  createFiles(list) {
    let taskArray = [];
    for (const { path, content } of list) {
      taskArray.push(this.createFile(path, content));
    }
    return Promise.all(taskArray);
  }
}
