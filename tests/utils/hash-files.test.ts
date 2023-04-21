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

    const expectedHash = createHash("md5");

    for (const path of paths) {
      const fullPath = join(process.cwd(), path);
      const pathNameBuffer = Buffer.from(path);
      const contents = readFileSync(fullPath);

      expectedHash.update(Buffer.concat([pathNameBuffer, contents]));
    }

    const actualHash = hashFileContents(paths, process.cwd());
    expect(expectedHash.digest("hex")).toEqual(actualHash);
  });

  it("should skip non-file paths", () => {
    const paths = ["./tests/__project__/alpha.txt", "./tests/__project__"];

    const pathNameBuffer = Buffer.from(paths[0]);
    const contents = readFileSync(join(process.cwd(), paths[0]));

    const expectedHash = createHash("md5")
      .update(Buffer.concat([pathNameBuffer, contents]))
      .digest("hex");

    const actualHash = hashFileContents(paths, process.cwd());
    expect(actualHash).toEqual(expectedHash);
  });
});
