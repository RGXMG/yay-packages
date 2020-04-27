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
const globalPath = __importStar(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const renderDynamicImport = (chunkName, path) => {
    return new Promise((res, rej) => {
        fs_extra_1.default.readFile(globalPath.join(__dirname, './dynamicImport'), 'utf8', (err, template) => {
            try {
                if (err) {
                    throw new Error(err);
                }
                const content = ejs_1.default.render(template, {
                    chunkName,
                    path: path.replace(/\\/g, '/'),
                });
                res(content);
            }
            catch (e) {
                rej(e);
            }
        });
    });
};
exports.default = renderDynamicImport;
