import * as path from 'path';
import { IConfig as IProjectConfig } from '../project';
import renderDynamicImport from './template';
import { FileManager, startUc, startLc } from '../util';

export interface IConfig {
  resolvePath: string;
  mergeRoutes: (routerMap: object) => object;
}
class EasyRouter {
  config: IConfig;
  // 项目的入口文件
  projectConfig: IProjectConfig;
  // 路由入口文件
  entry: string;
  // 动态路由管理者
  dynamicRouterFileManager: FileManager;
  // 路由文件管理者
  routerFileManger: FileManager;
  // 临时存在管理者
  tempFileManger: FileManager;
  // 项目dir list
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
    this.createRouterFileManger();
    this.createTempFileManger();
    this.createDynamicRouterFileManager();
  }

  init() {
    const { resolvePath } = this.config;
    if (!resolvePath) {
      throw new Error('route entry was not found');
    }
    this.entry = resolvePath;
  }

  /**
   * 执行
   */
  async start(): Promise<{ routerPath: string; routersMapStringify: string }> {
    try {
      const fileManager = new FileManager(this.entry);
      this.projectDirList = await fileManager.getDirLs();
      // 1. 开始编译
      await this.compile();
      // 2. 开始生成
      await this.generator();
      // 3. 加载生成好的文件
      this.routersMap = require(this.tempFileManger.path);
      // 4. 合并处理
      this.merge();
      // 5. 将处理后的结果导出
      const routerPath = await this.output();
      return { routerPath, routersMapStringify: JSON.stringify(this.routersMap) };
    } catch (e) {
      console.error(e);
      return { routerPath: null, routersMapStringify: null };
    }
  }

  /**
   * 编译，将得到的dir list进行template处理
   * 1. 如果文件夹名称以.开头，则跳过该文件
   */
  async compile() {
    for (const item of this.projectDirList) {
      if (item.startsWith('.')) continue;
      const itemContent = await renderDynamicImport(item, `${this.entry}/${item}/`);
      itemContent.replace('\\', '/');
      this.renderContentList.push({ name: item, content: itemContent });
    }
  }

  /**
   * 处理输出，将根据Project 进行创建
   */
  async output() {
    try {
      let content = '';
      for (const [k, v] of Object.entries(this.routersMap)) {
        content += `${k}: ${v.toString()},`;
      }
      const routerPath = path.join(__dirname, `template/router_${this.projectConfig.name}.js`);
      await this.dynamicRouterFileManager.createFile(
        routerPath,
        `/* eslint-disable */ \n export default {${content}}`
      );
      return routerPath;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  /**
   * 合并路由，提供一个mergeRoutes函数，该函数可以处理生成的路由结果
   * 必须提供返回值
   */
  merge() {
    if (typeof this.config.mergeRoutes === 'function') {
      this.routersMap = Object.keys(this.routersMap).reduce(
        (obj, k) => ((obj[startLc(k)] = this.routersMap[k]), obj),
        {}
      );
      this.routersMap = this.config.mergeRoutes(this.routersMap);
      if (Object.prototype.toString.call(this.routersMap) !== '[object Object]') {
        throw new Error(
          'You must provide a return value of type object when you use "mergeRoutes" function'
        );
      }
    }
    this.routersMap = Object.keys(this.routersMap).reduce(
      (obj, k) => ((obj[startUc(k)] = this.routersMap[k]), obj),
      {}
    );
  }

  /**
   * 生成最终的文件内容
   */
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
}
export default EasyRouter;
