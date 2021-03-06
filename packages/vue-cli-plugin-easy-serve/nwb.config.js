const path = require('path');
const nwbConfig = require('../../nwb.config');

nwbConfig.webpack.aliases = { '@_': path.resolve(__dirname, './packages') };
if (nwbConfig.path) {
  delete nwbConfig.path;
}
module.exports = nwbConfig;
