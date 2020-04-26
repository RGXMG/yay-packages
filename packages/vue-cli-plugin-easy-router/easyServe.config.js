const path = require('path');
module.exports = {
  entryPathMap: {
    seller: path.resolve(__dirname, 'seller/src/views'),
    sales: path.resolve(__dirname, 'seller/src/views'),
    platform: path.resolve(__dirname, 'seller/src/views'),
  },
  outputPathMap: {
    seller: path.resolve(__dirname, 'seller/src/views'),
    sales: path.resolve(__dirname, 'seller/src/views'),
    platform: path.resolve(__dirname, 'seller/src/views'),
  },
  publicPathMap: {
    seller: path.resolve(__dirname, 'seller/src/public'),
    sales: path.resolve(__dirname, 'seller/src/public'),
    platform: path.resolve(__dirname, 'seller/src/public'),
  },
  router: {
    seller: {
      resolvePath: path.resolve(__dirname, 'seller/src/views'),
      mergeRoutes(routersMap) {
        return routersMap;
      },
    },
  },
  configureWebpack: {
    seller(config) {
      console.log(config);
    },
  },
};
