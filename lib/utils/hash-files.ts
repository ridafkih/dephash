import xxhash from "@ridafkih/xxhash-wasm";
import { readFileSync } from "fs";
import { join } from "path";
import { createHash } from "crypto";
import type { Algorithm } from "types/algorithm";

const makeHash = (algorithm: Algorithm) => {
  if (algorithm === "xxhash") {
    const hash = xxhash().create64();

    return {
      update: (input: string | Buffer) => hash.update(input),
      digest: () => hash.digest().toString(16).padStart(16, "0"),
    };
  }

  if (algorithm === "sha1") {
    const hash = createHash("sha1");

    return {
      update: (input: string | Buffer) => hash.update(input),
      digest: () => hash.digest("hex").substring(0, 32),
    };
  }

  throw Error(`Invalid algorithm '${algorithm}' supplied.`);
};

interface HashFileContentsOptions {
  algorithm?: Algorithm;
  rootDirectory?: string;
}

/**
 * Hashes an array of file paths contents as a hash.
 * @param paths An array of paths relative to the current working directory.
 * @param rootDirectory Root directory to append to the beginning of paths provided.
 * @returns A hex-representation of the hash.
 */
export const hashFileContents = (
  paths: string[],
  { algorithm = "sha1", rootDirectory }: HashFileContentsOptions
) => {
  const hash = makeHash(algorithm);

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

  return hash.digest();
};
