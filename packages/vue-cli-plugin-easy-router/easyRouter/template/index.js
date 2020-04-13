const fs = require('fs-extra');
const ejs = require('ejs');
const people = ['geddy', 'neil', 'alex'];
const html = ejs.render('<%= people.join(", "); %>', { people: people });
console.log(html);

const renderDynamicImport = (chunkName, path, pathObjProperty) => {
  return new Promise((res, rej) => {
    fs.readFile('./dynamicImport', 'utf8', (err, template) => {
      try {
        if (err) {
          throw new Error(err);
        }
        const content = ejs.render(template, { chunkName, path, pathObjProperty });
        res(content);
      } catch (e) {
        rej(e);
      }
    });
  });
};
renderDynamicImport();
