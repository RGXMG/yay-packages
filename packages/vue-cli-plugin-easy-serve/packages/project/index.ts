import * as path from 'path';
import FileManager from '../util/fileManager';

interface IRouterObj {
  routerPath: string;
  routersMapStringify: string;
}
export interface IConfig {
  name: string;
  entry: string;
  defines: (objOpts: IWebpackOpt) => object | object;
  definitions: object;
  output: string;
  publicPath: string;
  configureWebpack?: (config) => any | void;
}
export interface IWebpackOpt
  extends Pick<IRouterObj, 'routerPath'>,
    Pick<
      IConfig,
      | 'name'
      | 'publicPath'
      | 'configureWebpack'
      | 'definitions'
      | 'name'
      | 'entry'
      | 'defines'
      | 'output'
    > {
  template: string;
}
class Project {
  config: IConfig;
  name: IConfig['name'];
  routerObj: IRouterObj;
  entryTemplateFileManger: FileManager;
  entry: IConfig['entry'];
  routerPath: string;
  publicPath: IConfig['publicPath'];
  constructor(config: IConfig, routerObj: IRouterObj) {
    this.name = config.name;
    this.entry = config.entry;
    this.routerPath = routerObj.routerPath;
    this.routerObj = routerObj;
    this.publicPath = config.publicPath;
    this.config = config;
    this.createEntryTemplateFileManger();
  }
  async start() {
    this.entry = await this.generatorProjectEntryFile();
    return this;
  }
  async generatorProjectEntryFile() {
    let content = await this.entryTemplateFileManger.readContent();
    content = content.toString().replace('__entry__', this.entry);
    content = content.replace('__router__', this.routerPath);
    const entryPath = path.join(__dirname, `template/entry_${this.name}.js`);
    await this.entryTemplateFileManger.createFile(entryPath, content.replace(/\\/g, '/'));
    return entryPath;
  }
  getWebpackConfig(): IWebpackOpt {
    const { output, defines, definitions, configureWebpack, name, publicPath } = this.config;
    return {
      name,
      entry: this.entry,
      output,
      defines,
      definitions,
      configureWebpack: configureWebpack || (() => {}),
      routerPath: this.routerPath,
      template: path.join(publicPath, './index.html'),
      publicPath,
    };
  }
  createEntryTemplateFileManger() {
    this.entryTemplateFileManger = new FileManager(path.join(__dirname, 'template/entry.js'));
  }
}
export default Project;
