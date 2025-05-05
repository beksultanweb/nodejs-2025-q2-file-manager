import { createReadStream } from "fs";
import { createHash } from "crypto";
import path from "path";

export const hashFile = (filename) => {
  const filePath = path.resolve(process.cwd(), filename);
  createReadStream(filePath)
    .pipe(createHash("sha256").setEncoding("hex"))
    .on("finish", function () {
      console.log("Hash:", this.read());
    });
};
