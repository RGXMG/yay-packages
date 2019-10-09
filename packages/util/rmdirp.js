const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);
const readdir = promisify(fs.readdir);

const rmdirp = async function(path, callback = () => {}) {
  const isDir = async (path) => {
    try {
      const statInfo = await stat(path);
      return statInfo.isDirectory();
    } catch (e) {
      throw e;
    }
  };
  const concatEvery = (array, str) => array.map(i => `${str}${i}`);
  const handle = async function(path) {
    try {
      const childs = concatEvery(await readdir(path), `${path}/`);
      for (const p of childs) {
        if (!await isDir(p)) {
          await unlink(p);
          continue;
        }
        await handle(p);
      }
      await rmdir(path);
    } catch (e) {
      throw new Error(e);
    }
  };
  try {
    await handle(path);
    callback(null);
  } catch (e) {
    callback(e);
  }
};
module.exports = rmdirp;