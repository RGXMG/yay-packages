import Webpack from 'webpack';
import EasyRouter, { IConfig as IRouterConfig } from './easyRouter';
import Project, { IConfig as IProjectConfig, IWebpackOpt as IProjectConfigOpt } from './project';
interface IConfig {
  // 入口映射
  entryPathMap: object;
  outputPathMap: object;
  // 静态目录映射
  publicPathMap: object;
  // 路由配置
  router: {
    [propName: string]: IRouterConfig;
  };
  definitions: object;
  configureWebpack: object;
}
class EasyServe {
  config: IConfig;
  // 路由相关配置，需要交给EasyRouter进行处理
  routerConfig: IRouterConfig;
  // 项目相关配置，需要交给Project进行处理
  projectConfig: IProjectConfig;
  cwd: string;
  projectName: string;
  constructor(projectName) {
    if (!projectName) {
      throw new Error('easy-serve lost "projectName" command');
    }
    this.routerConfig = null;
    this.projectConfig = null;
    this.cwd = process.cwd();
    this.projectName = projectName;
    // 获取配置文件
    this.config = this.getConfig();
    // 解析配置文件，得出router及project需要处理的配置项
    this.parseConfig(this.projectName);
  }
  getConfig() {
    const config = require(`${this.cwd}/easyServe.config.js`);
    if (!config) {
      throw new Error(
        'The configuration file was not found, make sure that `easyServe.config.js` exists under `process.cwd()`'
      );
    }
    return config;
  }
  parseConfig(name) {
    const {
      entryPathMap,
      definitions = {},
      outputPathMap,
      publicPathMap,
      router,
      configureWebpack = {},
    } = this.config;
    const entry = entryPathMap[name];
    if (!entry)
      throw new Error(
        `The "entryPathMap -> ${name}" was not found in the configuration file "easyServe.config.js"`
      );
    const output = outputPathMap[name];
    const publicPath = publicPathMap[name];
    const defines = definitions[name] || {};
    this.projectConfig = {
      name,
      entry,
      output,
      definitions,
      defines,
      publicPath,
      configureWebpack: configureWebpack[name],
    };
    const routerOpt = router[name];
    if (!routerOpt)
      throw new Error(
        `The "router -> ${name}" was not found in the configuration file "easyServe.config.js"`
      );
    this.routerConfig = routerOpt;
  }
  async start() {
    // 处理router
    const { routerPath, routersMapStringify } = await new EasyRouter(
      this.routerConfig,
      this.projectConfig
    ).start();
    if (routerPath) {
      // 处理project
      return new Project(this.projectConfig, { routerPath, routersMapStringify }).start();
    }
    throw new Error('handle router path fail');
  }
}

/**
 * 处理definitions
 * @param defines
 * @param definitions
 * @param objectOpts
 */
function handleDefinitions(defines, definitions, objectOpts: IProjectConfigOpt) {
  try {
    const { default: defaultDefines = {} } = definitions;
    return {
      ['process.env.app']: JSON.stringify({
        ...defaultDefines,
        ...(typeof defines === 'function' ? defines(objectOpts) : defines),
      }),
    };
  } catch (e) {
    console.error(
      'an error occurred while processing the "handleDefinitions". Please check your "easyServe.config.js" configuration'
    );
    console.error(e);
    return {};
  }
}
export default api => {
  api.registerCommand('easy-serve', function(args, rawArgv = []) {
    const { mode, project, ...rest } = args;
    const isBuild = rawArgv[0] === 'build';
    if (!mode || !project) {
      throw new Error('The easy-serve command argument is lost "mode" and "project"');
    }

    const easyServe = new EasyServe(project);

    // 等待easy初始化完成之后
    // 对webpack配置进行修改
    easyServe.start().then(res => {
      const objectOpts: IProjectConfigOpt = res.getWebpackConfig();
      const {
        entry,
        output,
        template,
        defines,
        definitions,
        configureWebpack,
        routerPath,
        publicPath,
      } = objectOpts;
      api.configureWebpack(config => {
        // 更改entry
        config.entry = { app: [entry] };

        // 合并webpack配置项
        // @ts-ignore
        const assignObj = configureWebpack(config) || { plugins: [] };

        for (const plugin of config.plugins) {
          // 更改HtmlWebpackPlugin
          if (Object.getPrototypeOf(plugin).constructor.name === 'HtmlWebpackPlugin') {
            plugin.options.template = template;
          }
          // 定义变量
          if (Object.getPrototypeOf(plugin).constructor.name === 'DefinePlugin') {
          }
        }
        // 新增copy plugin
        const CopyWebpackPlugin = require('copy-webpack-plugin');
        const copyPlugin = new CopyWebpackPlugin([
          {
            from: publicPath,
            to: '.',
            ignore: ['/index.html', '.DS_Store'],
          },
        ]);
        config.resolve.alias['@_easy_serve_router_'] = routerPath;
        const nPlugin = [
          copyPlugin,
          new Webpack.DefinePlugin(handleDefinitions(defines, definitions, objectOpts)),
        ];
        return {
          ...assignObj,
          plugins:
            assignObj.plugins && Array.isArray(assignObj.plugins)
              ? assignObj.plugins.concat(nPlugin)
              : nPlugin,
        };
      });

      // Avoid modifying webpack output.path directly.
      // Use the "outputDir" option instead
      api.service.projectOptions.outputDir = output;

      // 区分build以及serve
      if (isBuild) {
        return api.service.run('build', { mode, ...rest }, rawArgv);
      }
      api.service.run('serve', { mode, ...rest }, rawArgv);
    });
  });
};
