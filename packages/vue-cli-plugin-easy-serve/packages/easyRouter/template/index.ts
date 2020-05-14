import fs from 'fs-extra';
import * as globalPath from 'path';
import ejs from 'ejs';

const renderDynamicImport = (
  chunkName: string,
  path: string,
): Promise<string> => {
  return new Promise((res, rej) => {
    fs.readFile(globalPath.join(__dirname, './dynamicImport'), 'utf8', (err, template) => {
      try {
        if (err) {
          throw new Error(err);
        }
        const content = ejs.render(template, {
          chunkName,
          path: path.replace(/\\/g, '/'),
        });
        res(content);
      } catch (e) {
        rej(e);
      }
    });
  });
};
export default renderDynamicImport;
