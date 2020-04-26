import * as path from 'path';
import { IConfig as IProjectConfig } from '../project';
import renderDynamicImport from './template';
import FileManager from '../util/fileManager';

interface IOutput {
  path: string;
  filename: string;
}
export interface IConfig {
  resolvePath: string;
  mergeRoutes: (routerMap: object) => object;
  output: IOutput;
}
class EasyRouter {
  config: IConfig;
  // 项目的入口文件
  projectConfig: IProjectConfig;
  entry: string;
  outputOpt: {
    path: string;
    filename: string;
  };
  outputFileManager: FileManager;
  dynamicRouterFileManager: FileManager;
  routerFileManger: FileManager;
  tempFileManger: FileManager;
  projectDirList: Array<string>;
  renderContentList: Array<{
    name: string;
    content: string;
  }>;
  routersMap: object;
  constructor(config: IConfig, projectConfig: IProjectConfig) {
    this.config = config;
    this.projectConfig = projectConfig;
    this.entry = void 0;
    this.renderContentList = [];
    this.routersMap = {};
    this.init();
    this.createOutputFileManager();
    this.createRouterFileManger();
    this.createTempFileManger();
    this.createDynamicRouterFileManager();
  }

  init() {
    const { resolvePath, output } = this.config;
    if (!resolvePath) {
      throw new Error('route entry was not found');
    }
    if (!output) {
      throw new Error('output file not found');
    }
    this.entry = resolvePath;
    this.outputOpt = output;
  }

  async start(): Promise<{ routerPath: string }>  {
    try {
      const fileManager = new FileManager(this.entry);
      this.projectDirList = await fileManager.getDirLs();
      await this.compile();
      await this.generator();
      this.routersMap = require(this.tempFileManger.path);
      this.merge();
      process.env.VUE_APP_CLI_EASY_SERVE_ROUTER = JSON.stringify(this.routersMap);
      const routerPath = await this.output();
      return { routerPath }
    } catch (e) {
      console.error(e);
      return { routerPath: null }
    }
  }
  async compile() {
    for (const item of this.projectDirList) {
      const itemContent = await renderDynamicImport(item, `${this.entry}/${item}/`);
      itemContent.replace('\\', '/');
      this.renderContentList.push({ name: item, content: itemContent });
    }
  }
  async output() {
    try {
      let content = '';
      for (const [k, v] of Object.entries(this.routersMap)) {
        content += `${k}: ${v.toString()},`;
      }
      const routerPath = path.join(__dirname, `template/router_${this.projectConfig.name}.js`);
      await this.dynamicRouterFileManager.createFile(routerPath, `/* eslint-disable */ \n export default {${content}}`);
      return routerPath;
    }
    catch (e) {
      console.error(e);
      return null
    }
  }
  merge() {
    const startUc = str =>
      str.replace(/(\s|^)[a-z]/g, function(char) {
        return char.toUpperCase();
      });
    const startLc = str =>
      str.replace(/(\s|^)[a-z]/g, function(char) {
        return char.toLowerCase();
      });
    this.routersMap = Object.keys(this.routersMap).reduce(
      (obj, k) => ((obj[startLc(k)] = this.routersMap[k]), obj),
      {}
    );
    if (typeof this.config.mergeRoutes === 'function') {
      this.routersMap = this.config.mergeRoutes(this.routersMap);
    }
    this.routersMap = Object.keys(this.routersMap).reduce(
      (obj, k) => ((obj[startUc(k)] = this.routersMap[k]), obj),
      {}
    );
  }
  async generator() {
    try {
      const content = await this.dynamicRouterFileManager.readContent();
      const renderContent = this.renderContentList.reduce(
        (str, { name, content }) => ((str += `${name}:${content},`), str),
        ''
      );

      const nContent = content.toString().replace('__placeholder__', renderContent);
      await this.tempFileManger.writeContent(nContent);

    } catch (e) {
      console.error(e);
    }
  }
  createRouterFileManger() {
    this.routerFileManger = new FileManager(path.join(__dirname, './template/router.js'));
  }
  createTempFileManger() {
    this.tempFileManger = new FileManager(path.join(__dirname, './template/temp.js'));
  }

  createDynamicRouterFileManager() {
    this.dynamicRouterFileManager = new FileManager(
      path.join(__dirname, './template/dynamicRouter')
    );
  }
  createOutputFileManager() {
    const { path: op, filename } = this.outputOpt;
    this.outputFileManager = new FileManager(path.join(op, filename));
  }
}
export default EasyRouter;
