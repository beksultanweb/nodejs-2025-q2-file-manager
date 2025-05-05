import fs from "fs";
import path from "path";

export const changeDirectory = (target) => {
  process.chdir(path.resolve(process.cwd(), target));
};

export const moveUp = (rootPath) => {
  if (process.cwd() !== rootPath) {
    process.chdir("..");
  }
};

export const listDirectory = () => {
  fs.readdir(process.cwd(), (err, files) => {
    if (err) return console.error("Unable to scan directory:", err);

    const tableData = files
      .map((file) => {
        const fullPath = path.join(process.cwd(), file);
        const stats = fs.statSync(fullPath);
        return {
          Name: file,
          Type: stats.isDirectory() ? "Directory" : "File",
        };
      })
      .sort((a, b) =>
        a.Type === "Directory" ? -1 : a.Name.localeCompare(b.Name)
      );

    console.table(tableData);
  });
};
