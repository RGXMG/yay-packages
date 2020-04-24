const path = require('path');
module.exports = {
  entryPathResolved: {
    seller: path.resolve(__dirname, 'seller/src/views'),
    sales: path.resolve(__dirname, 'seller/src/views'),
    platform: path.resolve(__dirname, 'seller/src/views')
  },
  output: {
    path: path.resolve(__dirname, 'common/src/config'),
    filename: 'dynamic-component.js'
  }
};
