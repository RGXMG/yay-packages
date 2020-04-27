import FileManager from './fileManager';

const startUc = str =>
  str.replace(/(\s|^)[a-z]/g, function(char) {
    return char.toUpperCase();
  });
const startLc = str =>
  str.replace(/(\s|^)[A-Z]/g, function(char) {
    return char.toLowerCase();
  });
export { startUc, startLc, FileManager };
