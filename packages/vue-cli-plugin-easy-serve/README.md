## vue-cli-easy-serve

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588051798488&di=4030fcd2eb4501b1f98dcedab6da282b&imgtype=0&src=http%3A%2F%2Fimgup02.dumanhua.com%2Fdumanhua%2F2019-01%2F07%2F09%2F15468262228954_0.jpg)

### 用途

proxy vue serve，根绝配置文件自动抓取文件目录配置，生成 webpack 动态加载的路由配置项，非动态路由部分自行`merge`进来。

### 如何使用：

1. 配置一个`easyServe.config.js`配置文件；
2. 生成的路由映射`alias`地址为：`@_easy_serve_router_`，使用`require(@_easy_serve_router_)`导入路由映射;
3. dev 使用：`vue-cli-service easy-serve --mode [mode] --project [project]`;
4. build 使用：`vue-cli-service easy-serve build --mode [mode] --project [project]`;

### 抓取规则：

1. 从配置文件中`resolvePath`为入口开始匹配；
2. 以 . 开头的文件自动忽略；
3. 将匹配后的路由传入`mergeRoutes`交给用户自行处理(如果存在`mergeRoutes`)；
4. 处理后的路由作为最终的路由配置项；

```javascript
router: {
    // 项目名称，从command指定
    platform: {
      // resolve path
      resolvePath: path.resolve(__dirname, 'platform/src/views'),
      // 合并路由，可以删除，可以新增，最后需要返回一个最终的路由
      mergeRoutes(routersMap) {
        // NOTE 注意：此处会将文件名的首字母全部转为小写
        delete routersMap.productcontrol;
        return {
          ...routersMap,
          ...dynamicComponentOfPlatform
        };
      }
    },
```

### 生成规则：

从`resolvePath`入口抓取的文件，会以 webpack 和 vue 需要的动态路由格式【[webpack 怎么实现动态路由代码分割？](https://www.webpackjs.com/plugins/split-chunks-plugin/)】【[什么是 vue 动态路由格式？](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)】返回；如`productControl`文件夹，最终会生成为：

```javascript
// NOTE 生成后首字母会大写，此处和mergeRoutes相反，需要注意；
ProductControl: path => () =>
  import(/* webpackChunkName: "ProductControl" */ `@seller/view/productControl/${path}`);
```

### easyServe.config.js

#### 位置

配置文件必须放在项目根目录下，plugin 会根据`cwd`目录去查找该配置，暂不支持自定义位置；

#### 配置项

```javascript
module.exports = {
  // 项目入口位置【绝对路径】
  entryPathMap: {
    seller: path.resolve(__dirname, 'seller/src/main.js'),
  },
  // 项目dist目录【绝对路径】
  outputPathMap: {
    seller: path.resolve(__dirname, 'dist/seller'),
  },
  // 项目public目录【绝对路径】
  publicPathMap: {
    seller: path.resolve(__dirname, 'seller/public'),
  },
  router: {
    // 对应项目名称的router配置项
    seller: {
      // 路由解析路径
      resolvePath: path.resolve(__dirname, 'seller/src/views'),
      // merge路由，在这里你可以增删改配置，确保最后返回一个router配置；
      // 自动生成的一个router item 为：
      // ProductControl: path => () => import(/* webpackChunkName: "ProductControl" */ `@seller/view/productControl/${path}`);
      // 在这里你可以针对某个路由进行更改，如判断path进行更改路径；
      // 也可以merge新的异步或者同步路由；
      mergeRoutes(routersMap) {
        return routersMap;
      },
    },
  },
  // 【可选】定义一些全局变量，你可以通过process.env.app访问
  definitions: {
    //【可选】 默认，每个项目都会进行定义
    default: {
      defaultTitle: '中治旅业',
    },
    // 【可选】 --project seller 时定义的变量
    seller: {
      isSeller: true,
      title: '游阿姨 - 供应端',
      moduleId: 3,
    },
  },
  // 【可选】使用方法同vue-cli中的configureWebpack
  configureWebpack(config) {},
};
```

### 实现原理：

请阅读源码
