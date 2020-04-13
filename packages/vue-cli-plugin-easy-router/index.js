// const EasyRouter = require('./easyRouter');
module.exports = api => {
  console.log('in');
  api.configureWebpack(config => {
    return;
  });
  api.registerCommand('easy-serve', args => {
    // new EasyRouter(args.project);
    console.log(args);
  });
};
