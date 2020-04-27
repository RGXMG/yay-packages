"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileManager_1 = __importDefault(require("./fileManager"));
exports.FileManager = fileManager_1.default;
const startUc = str => str.replace(/(\s|^)[a-z]/g, function (char) {
    return char.toUpperCase();
});
exports.startUc = startUc;
const startLc = str => str.replace(/(\s|^)[A-Z]/g, function (char) {
    return char.toLowerCase();
});
exports.startLc = startLc;
