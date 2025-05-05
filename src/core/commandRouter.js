import path from "path";
import {
  changeDirectory,
  listDirectory,
  moveUp,
} from "../commands/navigation.js";
import {
  addFile,
  copyFile,
  createDir,
  readFile,
  removeFile,
  renameFile,
} from "../commands/fileOps.js";
import { printOsInfo } from "../commands/osOps.js";
import { hashFile } from "../commands/hash.js";
import { compressFile, decompressFile } from "../commands/compress.js";
import { resolvePathOrFail } from "../utils/resolvePathOrFail.js";
import { promises } from "fs";

export async function handleCommand(input, rootPath) {
  const [command, arg1, arg2] = input.trim().split(" ");

  const secondArg = arg1
    ? (command === "mkdir") | (command === "add") | (command === "os")
      ? path.resolve(process.cwd(), arg1)
      : await resolvePathOrFail(arg1)
    : null;

  const thirdArg = arg2
    ? (command === "rn") |
      (command === "mv") |
      (command === "cp") |
      (command === "compress") |
      (command === "decompress")
      ? path.resolve(process.cwd(), arg2)
      : await resolvePathOrFail(arg2)
    : null;

  if ((arg1 && !secondArg) || (arg2 && !thirdArg)) {
    return;
  }

  switch (command) {
    case "ls":
      listDirectory();
      break;
    case "rn":
    case "mv":
      renameFile(secondArg, thirdArg);
      break;
    case "cp":
      copyFile(secondArg, thirdArg);
      break;
    case "rm":
      removeFile(secondArg);
      break;
    case "os":
      printOsInfo(arg1);
      break;
    case "hash":
      hashFile(secondArg);
      break;
    case "compress":
      compressFile(secondArg, thirdArg);
      break;
    case "decompress":
      decompressFile(secondArg, thirdArg);
      break;
    case "up":
      moveUp(rootPath);
      listDirectory();
      break;
    case "add":
      try {
        await promises.access(secondArg);
        console.log(`File ${arg1} already exists`);
        return;
      } catch {
        try {
          addFile(secondArg);
        } catch {
          console.error("Operation failed");
        }
      }

      break;
    case "mkdir":
      try {
        await promises.access(secondArg);
        console.log(`Directory ${arg1} already exists`);
        return;
      } catch {
        try {
          createDir(secondArg);
        } catch {
          console.error("Operation failed");
        }
      }

      break;
    case "cat":
      readFile(secondArg);
      break;
    case "cd":
      changeDirectory(secondArg);
      listDirectory();
      break;
    default:
      console.log("Invalid command");
  }
}
