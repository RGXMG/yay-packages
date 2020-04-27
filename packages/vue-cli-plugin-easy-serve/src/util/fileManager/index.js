"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const globalFs = __importStar(require("fs"));
const stream_1 = require("stream");
const util_1 = require("util");
// @ts-ignore
class FileManager {
    constructor(path) {
        this.path = path;
    }
    async getDirLs() {
        try {
            return await util_1.promisify(fs_extra_1.default.readdir)(this.path);
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async dirIsExisted(path) {
        try {
            const stat = await util_1.promisify(fs_extra_1.default.stat)(path);
            return stat.isDirectory();
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async fileIsExisted(path) {
        try {
            const stat = await util_1.promisify(fs_extra_1.default.stat)(path);
            return !stat.isDirectory();
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async createDir(path) {
        try {
            await fs_extra_1.default.ensureDir(path);
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async createFile(path, content) {
        try {
            if (content) {
                await fs_extra_1.default.outputFile(path, content);
            }
            else {
                await fs_extra_1.default.ensureFile(path);
            }
        }
        catch (e) {
            throw new Error(e);
        }
    }
    createFiles(list) {
        let taskArray = [];
        for (const { path, content } of list) {
            taskArray.push(this.createFile(path, content));
        }
        return Promise.all(taskArray);
    }
    createWriteStream() {
        return globalFs.createWriteStream(this.path, 'utf8');
    }
    //
    pipe(object) {
        const keys = Object.keys(object);
        if (keys.includes('transform')) {
            const rs = globalFs.createReadStream(this.path, { flags: 'r', encoding: 'utf8' });
            // @ts-ignore
            return rs.pipe(new stream_1.Transform(object));
        }
        return null;
    }
    readContent() {
        return util_1.promisify(fs_extra_1.default.readFile)(this.path);
    }
    writeContent(nContent) {
        return util_1.promisify(fs_extra_1.default.writeFile)(this.path, nContent, 'utf8');
    }
}
exports.default = FileManager;
