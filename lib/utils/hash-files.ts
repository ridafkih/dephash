import { createHash } from "crypto";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Hashes an array of file paths contents as a hash.
 * @param paths An array of paths relative to the current working directory.
 * @param rootDirectory Root directory to append to the beginning of paths provided.
 * @returns A hex-representation of the hash.
 */
export const hashFileContents = (paths: string[], rootDirectory?: string) => {
  const hash = createHash("sha1");

  for (const path of paths) {
    const fullPath = rootDirectory ? join(rootDirectory, path) : path;

    try {
      const contents = readFileSync(fullPath);
      hash.update(path).update(contents);
    } catch (error: unknown) {
      if (!error || typeof error !== "object" || !("code" in error)) continue;
      console.warn(
        `There was a(n) ${error.code} error scanning '${path}', which may result in an unexpected hash.`
      );
    }
  }

  return hash.digest("hex").substring(0, 32);
};
