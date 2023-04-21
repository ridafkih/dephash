import { hashDependencies } from "utils/hash-dependencies";
import { join } from "path";
import { describe, it, expect } from "vitest";

describe("hashFileContents", () => {
  it("should generate a hash given a root folder", () => {
    const { hash, fileCount } = hashDependencies({
      rootDirectory: join(process.cwd(), "tests", "__project__"),
      additionalPatterns: ["**/*.txt"],
    });

    expect(fileCount).toBe(3);
    expect(hash).toBeTypeOf("string");
  });
  it("should always generate the same hash", () => {
    const { hash } = hashDependencies({
      rootDirectory: join(process.cwd(), "tests", "__project__"),
      additionalPatterns: ["**/*.txt"],
    });

    expect(hash).toMatchSnapshot();
  });
});
