import { IConfig as IProjectConfig } from '../project';
import { FileManager } from '../util';
export interface IConfig {
    resolvePath: string;
    mergeRoutes: (routerMap: object) => object;
}
declare class EasyRouter {
    config: IConfig;
    projectConfig: IProjectConfig;
    entry: string;
    dynamicRouterFileManager: FileManager;
    routerFileManger: FileManager;
    tempFileManger: FileManager;
    projectDirList: Array<string>;
    renderContentList: Array<{
        name: string;
        content: string;
    }>;
    routersMap: object;
    constructor(config: IConfig, projectConfig: IProjectConfig);
    init(): void;
    /**
     * 执行
     */
    start(): Promise<{
        routerPath: string;
        routersMapStringify: string;
    }>;
    /**
     * 编译，将得到的dir list进行template处理
     * 1. 如果文件夹名称以.开头，则跳过该文件
     */
    compile(): Promise<void>;
    /**
     * 处理输出，将根据Project 进行创建
     */
    output(): Promise<string>;
    /**
     * 合并路由，提供一个mergeRoutes函数，该函数可以处理生成的路由结果
     * 必须提供返回值
     */
    merge(): void;
    /**
     * 生成最终的文件内容
     */
    generator(): Promise<void>;
    createRouterFileManger(): void;
    createTempFileManger(): void;
    createDynamicRouterFileManager(): void;
}
export default EasyRouter;
