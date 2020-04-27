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
    configureWebpack?: (config: any) => any | void;
}
export interface IWebpackOpt extends Pick<IRouterObj, 'routerPath'>, Pick<IConfig, 'name' | 'publicPath' | 'configureWebpack' | 'definitions' | 'name' | 'entry' | 'defines' | 'output'> {
    template: string;
}
declare class Project {
    config: IConfig;
    name: IConfig['name'];
    routerObj: IRouterObj;
    entryTemplateFileManger: FileManager;
    entry: IConfig['entry'];
    routerPath: string;
    publicPath: IConfig['publicPath'];
    constructor(config: IConfig, routerObj: IRouterObj);
    start(): Promise<this>;
    generatorProjectEntryFile(): Promise<string>;
    getWebpackConfig(): IWebpackOpt;
    createEntryTemplateFileManger(): void;
}
export default Project;
