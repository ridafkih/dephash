import { createHash } from "crypto";
import { statSync, readFileSync } from "fs";
import { join } from "path";

export const hashFileContents = (paths: string[]) => {
  const hash = createHash("md5");

  for (const path of paths) {
    if (!statSync(path).isFile()) continue;
    const contents = readFileSync(join(process.cwd(), path));
    hash.update(contents);
  }

  return hash.digest("hex");
};
