"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fileManager_1 = __importDefault(require("../util/fileManager"));
class Project {
    constructor(config, routerObj) {
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
    getWebpackConfig() {
        const { output, defines, definitions, configureWebpack, name, publicPath } = this.config;
        return {
            name,
            entry: this.entry,
            output,
            defines,
            definitions,
            configureWebpack: configureWebpack || (() => { }),
            routerPath: this.routerPath,
            template: path.join(publicPath, './index.html'),
            publicPath,
        };
    }
    createEntryTemplateFileManger() {
        this.entryTemplateFileManger = new fileManager_1.default(path.join(__dirname, 'template/entry.js'));
    }
}
exports.default = Project;
