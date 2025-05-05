import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { pipeline } from "stream";

export const compressFile = (src, dest) => {
  pipeline(
    createReadStream(src),
    createBrotliCompress(),
    createWriteStream(dest),
    (err) => err && console.error(err)
  );
};

export const decompressFile = (src, dest) => {
  pipeline(
    createReadStream(src),
    createBrotliDecompress(),
    createWriteStream(dest),
    (err) => err && console.error(err)
  );
};
