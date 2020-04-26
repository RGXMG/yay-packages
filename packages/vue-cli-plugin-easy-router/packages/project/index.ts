import * as path from 'path';
import FileManager from '../util/fileManager';

interface IWebpackOpt {
  name: string;
  entry: string;
  output: string;
  template: string;
  publicPath: string;
}
export interface IConfig {
  name: string;
  entry: string;
  output: string;
  publicPath: string;
  configureWebpack?: (config) => void | null;
}
class Project {
  config: IConfig;
  name: IConfig['name'];
  entryTemplateFileManger: FileManager;
  entry: IConfig['entry'];
  routerPath: string;
  publicPath: IConfig['publicPath'];
  constructor(config: IConfig, routerPath: string) {
    this.name = config.name;
    this.entry = config.entry;
    this.routerPath = routerPath;
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
    const entryPath = path.join(__dirname,`template/entry_${this.name}.js`);
    await this.entryTemplateFileManger.createFile(entryPath, content.replace(/\\/g, '/'));
    return entryPath;
  }
  getWebpackConfig(): IWebpackOpt {
    const { output, name, publicPath } = this.config;
    return {
      name,
      entry: this.entry,
      output,
      template: path.join(publicPath, './index.html'),
      publicPath,
    };
  }
  createEntryTemplateFileManger() {
    this.entryTemplateFileManger = new FileManager(path.join(__dirname, 'template/entry.js'));
  }
}
export default Project;
