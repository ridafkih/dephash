import { Platform } from "enums/platform";
import { sync as globSync } from "fast-glob";
import { hashFileContents } from "utils/hash-files";
import type { HashDependenciesOptions } from "types/hash-dependencies-options";

import {
  PACKAGE_JSON_PATTERN,
  IOS_PACKAGE_PATTERN,
  ANDROID_PACKAGE_PATTERN,
  EXPO_CONFIGS_PATTERN,
  PLUGIN_CONFIGS_PATTERN,
} from "constants/glob-patterns";

const getMatchingGlobPaths = (
  pattern: string | string[],
  rootDirectory?: string
) => {
  return globSync(pattern, { cwd: rootDirectory, onlyFiles: true });
};

/**
 * Hashes the dependencies in the current working directory as a string.
 * @param options Optional options to change the behaviour of the dependency hashing functionality.
 * @returns A hash as a string representing the dependencies
 */
export const hashDependencies = ({
  rootDirectory,
  excludePlatforms,
  excludeExpoConfig,
  factorAllDependencyChanges,
  additionalPatterns,
}: HashDependenciesOptions = {}) => {
  const patterns: string[] = [];

  if (factorAllDependencyChanges) {
    const files = getMatchingGlobPaths(PACKAGE_JSON_PATTERN, rootDirectory);
    const hash = hashFileContents(files, { rootDirectory });
    return { hash, fileCount: files.length };
  }

  if (!excludePlatforms?.includes(Platform.Ios))
    patterns.push(IOS_PACKAGE_PATTERN);

  if (!excludePlatforms?.includes(Platform.Android))
    patterns.push(ANDROID_PACKAGE_PATTERN);

  if (!excludeExpoConfig)
    patterns.push(EXPO_CONFIGS_PATTERN, PLUGIN_CONFIGS_PATTERN);

  if (additionalPatterns) patterns.push(...additionalPatterns);

  const files = getMatchingGlobPaths(patterns, rootDirectory);

  const hash = hashFileContents(files, { rootDirectory });

  return { hash, fileCount: files.length };
};
