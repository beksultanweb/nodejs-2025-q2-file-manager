import { createReadStream, rename, rm, mkdir, writeFile, cp } from "fs";

export const addFile = (filePath) => {
  writeFile(filePath, "", (err) => err && console.error(err));
};

export const removeFile = (filePath) => {
  rm(filePath, (err) => err && console.error(err));
};

export const renameFile = (oldPath, newPath) => {
  rename(oldPath, newPath, (err) => err && console.error(err));
};

export const copyFile = (copyPath, newPath) => {
  cp(copyPath, newPath, (err) => {
    if (err) console.log(err);
  });
};

export const createDir = (dirPath) => {
  mkdir(dirPath, (err) => err && console.error(err));
};

export const readFile = (filename) => {
  createReadStream(filename, { encoding: "utf-8" }).pipe(process.stdout);
};
