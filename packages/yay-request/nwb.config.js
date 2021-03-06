const path = require('path');
const nwbConfig = require('../../nwb.config');

nwbConfig.webpack.aliases = { '@_': path.resolve(__dirname, './packages') };
const oldConfig = nwbConfig.webpack.config;
nwbConfig.webpack.config = config => {
  const cf = oldConfig(config);
  // console.log(cf);
  return cf;
};
if (nwbConfig.path) {
  delete nwbConfig.path;
}
module.exports = nwbConfig;
