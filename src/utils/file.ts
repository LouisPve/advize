import fs from "fs";

export function _isDirectoryExists(path: string): boolean {
  return fs.existsSync(path);
}

export function _createDirectory(path: string): void {
  if (!_isDirectoryExists(path)) {
    fs.mkdirSync(path);
  }
}

export default {
  _isDirectoryExists,
  _createDirectory,
};
