import { createHash } from "crypto";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Hashes an array of file paths contents as a hash.
 * @param paths An array of paths relative to the current working directory.
 * @param rootDirectory Root directory to append to the beginning of paths provided.
 * @returns A hex-representation of the hash.
 */
export const hashFileContents = (paths: string[], rootDirectory: string) => {
  const hash = createHash("md5");

  for (const path of paths) {
    try {
      const contents = readFileSync(join(rootDirectory, path));
      hash.update(path).update(contents);
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code !== "EISDIR"
      ) {
        console.warn(
          `There was a(n) ${
            error.code
          } error scanning '${path}', which may result in a different hash. The full path of the file is ${join(
            rootDirectory,
            path
          )}`
        );
      }
    }
  }

  return hash.digest("hex");
};
