class EasyVC {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('emit', function(compilation, callback) {
      console.log(Object.keys(compilation.assets));
      callback();
    });
    compiler.hooks.compilation.tap('compilation', function(compilation) {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('changeTags', function(data) {
        console.dir(data.head[0], 2);
      });
    });
  }
}
module.exports = EasyVC;
