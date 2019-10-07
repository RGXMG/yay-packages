const babelConfig = require('./babel.config');
const path = require('path');
module.exports = {
  type: 'react-component',
  babel: {
    config(config) {
      config.plugins.push(babelConfig.plugins.antd);
      return config;
    },
  },
  webpack: {
    aliases: {
      '@': path.resolve(__dirname, './src')
    },
    rules: {
      less: {
        options: {
          javascriptEnabled: true
        }
      },
    },
    config(config) {
      config.entry = {
        index: ['./demo/src/index'],
      };
     config.resolve.extensions = [
        '.jsx',
        '.tsx',
        '.js',
        '.ts'
      ];
     config.module.rules = config.module.rules.map(i => {
       if (!i.test.test('1.js')) return i;
       return {
         test: /\.(js|jsx|ts|tsx)$/,
         exclude: /node_modules/,
         use: [
           {
             loader: i.loader,
             options: i.options
           },
           {
             loader: 'ts-loader',
           }
         ],
       };
       });
     // config.module.rules.push({
     //    test: /\.ts$|\.tsx$/,
     //    loader: 'ts-loader'
     // });
     // console.dir(config.module.rules[0]);
     // console.dir(config.module.rules);
      return config;
    }
  },
  npm: {
    esModules: true,
    umd: 'request',
  }
};
// let rules = config.module.rules;
// let lessRule = null;
// config.module.rules = rules.filter(i => {
//   if (!i.test.test('1.less')) return true;
//   lessRule = i;
//   return false;
// });
// lessRule.use[lessRule.use.length - 1].options = {
//   javascriptEnabled: true
// };
// config.module.rules.push(lessRule);
// console.dir(config.module.rules[config.module.rules.length - 1]);