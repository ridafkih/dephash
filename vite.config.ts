import { configDefaults, defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "examples/**", ".vscode/**", ".github/**"],
    alias: {
      /** in-library resolutions */
      "constants": resolve(__dirname, "lib", "constants"),
      "enums": resolve(__dirname, "lib", "enums"),
      "utils": resolve(__dirname, "lib", "utils"),
      "types": resolve(__dirname, "lib", "types"),
    }
  },
});