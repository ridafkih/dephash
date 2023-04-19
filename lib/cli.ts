#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { program } from "commander";
import signale from "signale";
import { hashDependencies } from "utils/hash-dependencies";
import { Platform } from "enums/platform";

const PACKAGE_JSON_PATH = join(__dirname, "..", "package.json");
const { version = "0.0.0" } = JSON.parse(
  readFileSync(PACKAGE_JSON_PATH, "utf-8")
);

const isBooleanTrue = (value: unknown) => {
  return typeof value === "boolean" && value;
};

program
  .name("dephash")
  .description(
    "React Native & Expo utility package to utilize dependency-based hashes."
  )
  .version(version);

program
  .command("hash")
  .description(
    "Generates a hash based off the dependencies & files from the current working directory."
  )
  .option("--root-directory", "will be where the the scan begins for files")
  .option("--exclude-ios", "will not consider native ios changes")
  .option("--exclude-android", "will not consider native android changes")
  .option(
    "--exclude-expo-config",
    "will not consider expo changes (ie. *.plugin.js, app.config.js, etc.)"
  )
  .option(
    "--factor-all-changes",
    "will generate a new hash even if the changes are non-native"
  )
  .option("--additional-patterns <pattern>", 'glob patterns seperated by ","')
  .option("--raw, -r", "whether to just return the raw value in stdout")
  .option("--output <path>, -o <path>", "a path with a path to write out")
  .action((options) => {
    performance.mark("execution_start");

    const {
      rootDirectory,
      excludeIos,
      excludeAndroid,
      excludeExpoConfig,
      additionalPatterns,
      factorAllChanges,
      raw,
      R,
      output,
      O,
    } = options;

    const excludePlatforms = [];
    if (isBooleanTrue(excludeIos)) excludePlatforms.push(Platform.Ios);
    if (isBooleanTrue(excludeAndroid)) excludePlatforms.push(Platform.Android);

    const { hash, fileCount } = hashDependencies({
      rootDirectory:
        typeof rootDirectory === "string" ? rootDirectory : undefined,
      excludePlatforms,
      additionalPatterns:
        typeof additionalPatterns === "string"
          ? additionalPatterns.split(",").map((pattern) => pattern.trim())
          : undefined,
      excludeExpoConfig: isBooleanTrue(excludeExpoConfig),
      factorAllDependencyChanges: isBooleanTrue(factorAllChanges),
    });

    if (O || output) {
      const path = O || output;
      if (typeof path === "string") {
        writeFileSync(join(process.cwd(), path), hash);
      }
    }

    performance.mark("execution_end");
    performance.measure("execution_time", "execution_start", "execution_end");

    const [measurement] = performance.getEntriesByName("execution_time");

    performance.clearMarks();
    performance.clearMeasures();

    if (R || raw) {
      return console.log(hash);
    }

    signale.info(
      "%d files took %dms",
      fileCount,
      Math.round(measurement.duration)
    );

    signale.success(`hash: ${hash}`);
  });

program.parse();
