/// <reference types="node" />
import * as globalFs from 'fs';
import { Transform } from 'stream';
declare class FileManager {
    path: string;
    constructor(path: any);
    getDirLs(): Promise<any>;
    dirIsExisted(path: any): Promise<any>;
    fileIsExisted(path: any): Promise<boolean>;
    createDir(path: any): Promise<void>;
    createFile(path: any, content?: string): Promise<void>;
    createFiles(list: any): Promise<any[]>;
    createWriteStream(): globalFs.WriteStream;
    pipe(object: (ITransform | IDuplex) & {
        highWaterMark?: number;
    }): Transform;
    readContent(): any;
    writeContent(nContent: any): any;
}
interface ITransform {
    transform: (chunk: string, encoding: string, callback: () => void) => void;
}
interface IDuplex {
    read: void;
    write: void;
}
export default FileManager;
