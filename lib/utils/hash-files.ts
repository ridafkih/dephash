import { createHash } from "crypto";
import { statSync, readFileSync } from "fs";
import { join } from "path";

interface HashFileOptions {
  rootDirectory?: string;
}

/**
 * Hashes an array of file paths contents as a hash.
 * @param paths An array of paths relative to the current working directory.
 * @returns A hex-representation of the hash.
 */
export const hashFileContents = (
  paths: string[],
  { rootDirectory = process.cwd() }: HashFileOptions = {}
) => {
  const hash = createHash("md5");

  for (const path of paths) {
    if (!statSync(path).isFile()) continue;
    const contents = readFileSync(join(rootDirectory, path));
    hash.update(contents);
  }

  return hash.digest("hex");
};
