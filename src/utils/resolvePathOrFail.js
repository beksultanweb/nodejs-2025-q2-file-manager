import fs from "fs";
import path from "path";

export async function resolvePathOrFail(arg) {
  if (!arg) return null;

  const fullPath = path.resolve(process.cwd(), arg);

  try {
    await fs.promises.access(fullPath);
    return fullPath;
  } catch {
    console.error("Operation failed, path is not exist");
    return null;
  }
}
