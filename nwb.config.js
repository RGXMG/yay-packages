const babelConfig = require('./babel.config');
module.exports = {
  // nwb 暂未提供对vue的专项配置
  // 不过我们可以利用它的特性操作
  type: 'react-component',
  babel: {
    config(config) {
      console.dir(config.presets, 5);
      config.plugins.push(babelConfig.plugins.antd);
      return config;
    },
  },
  webpack: {
    rules: {
      less: {
        options: {
          javascriptEnabled: true,
        },
      },
    },
    config(config) {
      config.resolve.extensions = ['.jsx', '.tsx', '.js', '.ts'];
      config.module.rules = config.module.rules.map(i => {
        // 不匹配js
        if (!i.test.test('1.js')) return i;
        return {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: i.loader,
              options: i.options,
            },
            {
              loader: 'ts-loader',
            },
          ],
        };
      });
      return config;
    },
  },
  npm: {
    esModules: true,
    // default name is request
    umd: 'request',
  },
};
