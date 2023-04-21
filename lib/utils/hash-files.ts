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
      const pathNameBuffer = Buffer.from(path);
      const contents = readFileSync(join(rootDirectory, path));

      hash.update(Buffer.concat([pathNameBuffer, contents]));
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code !== "EISDIR"
      )
        console.warn(
          `There was an error scanning '${path}', which may result in a different hash.`
        );
    }
  }

  return hash.digest("hex");
};
