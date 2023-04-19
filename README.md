<div align="center">
  <h1>Dephash</h1>
  <p>A tool to hash native dependencies for React Native & Expo projects</p>
  <p>DepHash is a tool that allows you to automate the hashing of native dependencies for React Native and Expo projects. It can be used to easily track changes in dependencies and ensure reproducibility.</p>
  	<span>
		<a href="#installation">Installation</a>
		<span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
		<a href="#cli">CLI</a>
		<span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
		<a href="#usage">Usage</a>
		<span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
		<a href="#contribute">Contribute</a>
	</span>
</div>
<hr>

## Installation

To install Dephash, simply use your favourite Node.js package manager.

```bash
yarn add -D dephash
```

```bash
npm install --save-dev dephash
```

## CLI

Dephash exposes a CLI for you to generate a hash.

```bash
yarn dephash --raw
```

```bash
Generates a hash based off the dependencies & files from the current working directory.

Options:
  --exclude-ios                    will not consider native ios changes
  --exclude-android                will not consider native android changes
  --exclude-expo-config            will not consider expo changes (ie. *.plugin.js, app.config.js, etc.)
  --factor-all-changes             will generate a new hash even if the changes are non-native
  --additional-patterns <pattern>  glob patterns seperated by ","
  --raw, -r                        whether to just return the raw value in stdout
  -h, --help                       display help for command
```

## Usage

Dephash allows you to hash the dependencies in the current working directory as a string. The following is an example usage.

```ts
import { hashDependencies } = from "dephash";

const hash = hashDependencies();
console.log(hash);
```

This will hash the dependencies in the current working directory and print the resulting hash as a string to the console.

### Options

You can pass options to `hashDependencies` to customize its behaviour.

#### excludePlatforms

An array of `Platform` enums that allows you to exclude the native dependencies of specific platforms. The possible values of this enum are:

- `Platform.Android`
- `Platform.Ios`

#### excludeExpoConfig

A boolean value that allows you to exclude the Expo configuration files from the hash.

#### factorAllDependencyChanges

A boolean value that allows you to factor in all dependency changes into the hash, including those outside of native dependencies.

#### additionalPatterns

An array of additional glob patterns to include in the dependency hashing.

Here's an example of using the options:

```ts
import { hashDependencies, Platform } from "dephash";

const options = {
  excludePlatforms: [Platform.Ios],
  excludeExpoConfig: true,
  factorAllDependencyChanges: false,
  additionalPatterns: ["**/someFolder/*"],
};

const hash = hashDependencies(options);
console.log(hash);
```

## Contribute

Feel free to contribute to the repository. Pull requests and issues with feature requests are _super_ welcome!
