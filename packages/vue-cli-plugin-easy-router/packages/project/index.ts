import * as path from 'path';

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
  entry: IConfig['entry'];
  publicPath: IConfig['publicPath'];
  constructor(config: IConfig) {
    this.name = config.name;
    this.entry = config.entry;
    this.publicPath = config.publicPath;
    this.config = config;
  }
  getWebpackConfig(): IWebpackOpt {
    const { entry, output, name, publicPath } = this.config;
    return {
      name,
      entry,
      output,
      template: path.join(publicPath, './index.html'),
      publicPath,
    };
  }
}
export default Project;
