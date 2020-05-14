import fs from 'fs-extra';
import * as globalFs from 'fs';
import { Transform } from 'stream';
import { promisify } from 'util';

// @ts-ignore
class FileManager{
   path: string;
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

  async createFile(path, content?:string) {
    try {
      if (content) {
        await fs.outputFile(path, content);
      } else {
        await fs.ensureFile(path);
      }
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

  createWriteStream() {
    return globalFs.createWriteStream(this.path, 'utf8');
  }

//
  pipe(object: (ITransform | IDuplex) & {highWaterMark?: number}) {
    const keys = Object.keys(object);
    if (keys.includes('transform')) {
      const rs = globalFs.createReadStream(this.path, { flags: 'r', encoding: 'utf8' });
      // @ts-ignore
      return rs.pipe(new Transform(object));
    }
    return null;
  }

  readContent() {
    return promisify(fs.readFile)(this.path);
  }
  writeContent(nContent) {
    return promisify(fs.writeFile)(this.path, nContent, 'utf8')
  }

}
interface ITransform {
  transform: (chunk:string, encoding:string, callback: () => void) => void;
}
interface IDuplex {
  read: void;
  write: void
}
export default FileManager;
