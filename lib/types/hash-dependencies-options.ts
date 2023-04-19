import type { Platform } from "enums/platform";

export interface HashDependenciesOptions {
  /**
   * Which platforms to exclude from the search.
   */
  excludePlatforms?: Platform[];
  /**
   * Whether or not to exclude the following files from consideration when
   * producing the hash.
   *   - app.json
   *   - app.config.js
   *   - app.config.ts
   *   - *.plugin.js
   *   - *.plugin.ts
   *
   * @defaultValue
   *   The default value is `false`, thus they will be factored into the hash.
   */
  excludeExpoConfig?: boolean;
  /**
   * Factor all dependency changes.
   *
   * @remarks
   *   Instead of checking for native folders, it will check for changes of
   *   packages and their versions in package.json.
   *
   * @defaultValue
   *   The default value is `false`, meaning not all dependency changes
   *   will be factored into the resulting hash.
   */
  factorAllDependencyChanges?: boolean;
  /**
   * Include additional patterns to check for, these should be glob patterns.
   *
   * @remarks
   *   Make sure not to go absolutely ape-shit with the patterns, this can really
   *   affect performance.
   */
  additionalPatterns?: string[];
}
