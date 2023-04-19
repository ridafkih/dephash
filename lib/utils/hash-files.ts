import { createHash } from "crypto";
import { statSync, readFileSync } from "fs";
import { join } from "path";

/**
 * Hashes an array of file paths contents as a hash.
 * @param paths An array of paths relative to the current working directory.
 * @returns A hex-representation of the hash.
 */
export const hashFileContents = (paths: string[]) => {
  const hash = createHash("md5");

  for (const path of paths) {
    if (!statSync(path).isFile()) continue;
    const contents = readFileSync(join(process.cwd(), path));
    hash.update(contents);
  }

  return hash.digest("hex");
};
