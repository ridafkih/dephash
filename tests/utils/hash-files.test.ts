import { readFileSync } from "fs";
import { hashFileContents } from "utils/hash-files";
import { createHash } from "crypto";
import { join } from "path";
import { describe, it, expect } from "vitest";

describe("hashFileContents", () => {
  it("should correctly hash the contents of an array of file paths", () => {
    const paths = [
      "./tests/__project__/alpha.txt",
      "./tests/__project__/beta.txt",
      "./tests/__project__/charlie/charlie.txt",
    ];

    const expectedHash = createHash("sha1");

    for (const path of paths) {
      const fullPath = join(process.cwd(), path);
      const contents = readFileSync(fullPath);

      expectedHash.update(path).update(contents);
    }

    const actualHash = hashFileContents(paths, process.cwd());
    expect(expectedHash.digest("hex").substring(0, 32)).toEqual(actualHash);
  });
});
