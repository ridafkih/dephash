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
    ];
    const expectedHash = createHash("md5")
      .update(readFileSync(join(process.cwd(), paths[0])))
      .update(readFileSync(join(process.cwd(), paths[1])))
      .digest("hex");

    const actualHash = hashFileContents(paths);
    expect(actualHash).toEqual(expectedHash);
  });

  it("hash should not change based on the order of the files", () => {
    const paths = [
      "./tests/__project__/beta.txt",
      "./tests/__project__/alpha.txt",
    ];

    const expectedHash = createHash("md5")
      .update(readFileSync(join(process.cwd(), paths[0])))
      .update(readFileSync(join(process.cwd(), paths[1])))
      .digest("hex");

    const actualHash = hashFileContents(paths);
    expect(actualHash).toEqual(expectedHash);
  });

  it("should skip non-file paths", () => {
    const paths = ["./tests/__project__/alpha.txt", "./tests/__project__"];
    const expectedHash = createHash("md5")
      .update(readFileSync(join(process.cwd(), paths[0])))
      .digest("hex");

    const actualHash = hashFileContents(paths);
    expect(actualHash).toEqual(expectedHash);
  });
});
