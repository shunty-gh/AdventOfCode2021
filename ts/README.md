# Advent of Code 2021

## TypeScript solutions

Cross platform solutions written in [TypeScript](https://www.typescriptlang.org/) for the [Advent of Code 2021](https://adventofcode.com/2021) puzzles. The commands and instructions should apply equally to Windows and/or Linux and/or Windows Subsystem for Linux (WSL2). Maybe Mac, who knows.

### TL;DR

* Ensure node is installed.
* Clone repository

```
$> cd <repository_root>/ts
$> npm i
$> npm start
or, for a specific (completed) day:
$> npm start 13

```

### Get started

#### Pre-requisites
* [Node](https://nodejs.org/en/) - this was written using Node 16.xx. Probably most reasonably modern versions will work fine
* npm - installed via Node - as above but written with v8.x
* (Optional) [nvm](https://github.com/nvm-sh/nvm) - makes it much easier to handle Node installations especially on Ubuntu 20.x where the 'apt' package version of Node is very old. Follow the instructions on the README page to install it.
* [TypeScript](https://www.typescriptlang.org/) - can be installed [manually, globally](https://www.typescriptlang.org/download) or local to the project repository using the `npm` install command below
* (Optional) [Visual Studio Code](https://code.visualstudio.com/) - the build and run/debug tasks work with VS Code. The launch configuration for Node/TypeScript/JavaScript debugging uses the `pwa-node` type. This is not the 'out-of-the-box' Node debugger but is the [nightly build version](https://github.com/microsoft/vscode-js-debug), currently named `JavaScript Debugger (Nightly)` in the VS Code extensions list. This isn't needed if you are simply running from the command line - only needed for debugging.

#### Install / Set up

Assuming Node/npm are alreay installed. From the repository root directory in a command/shell prompt:

```
$> cd ts
$> npm i
```

**All commands from now on assume you are starting in the `ts` directory.**

The code to get the input for the respective day(s) is coded to look in the `<repository_root_folder>/input` directory which is expected to be at `../input` from the current working directory. Hence commands should generally be run from within the `ts` directory.

### Build and run

To compile the TypeScript code (from the `ts` directory):

```
$> tsc --build
```
or, in VS Code, use the Build command (Ctrl+Shift+B / Cmd+shift+B) and choose the `tsc: build` option if prompted.

The compiled JavaScript output will be put in the `lib` folder.

To run the code for the current day (or day 1 if not within Dec 1-25):

```
$> node lib/main.js
```
or, using the npm scripts
```
$> npm start
```
The `.ts`|`.js` file extensions are optional on the command line.

The code for the current day can be debugged in VS Code by pressing F5 and picking the `TypeScript` option if prompted.

#### Download input data

The input data for a given day can be downloaded by providing either the `f` or `ff` parameter to the command line along with the day number(s). If using the 'f' parameter and the data file already exists the system will warn and not overwrite. To force an overwrite use the `ff` parameter instead. eg:

```
$> npm start 2 ff
```
will download the input data for day 2 and overwrite it if it already exists.

#### Run specific day(s)

To run the solution for a specific day or days (if they have been completed) you can add space separated day numbers after the `(src|lib)/main` parameter. eg:

```
$> node lib/main 1 3
```
or
```
$> npm start 2 13
```
