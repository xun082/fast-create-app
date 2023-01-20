#!/usr/bin/env node

import { Command } from "commander";
import { answerHandle, createFile } from "./bin/core/index.js";
import figlet from "figlet";
import chalk from "chalk";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { version } = require("./package.json");

const program = new Command();

program.version(chalk.greenBright(version));

program
  .command("create-app <project-name>")
  .description("Create a directory for your project files")
  .action(answerHandle);

program
  .command("add <file>")
  .description("请输入添加添加文件的类型")
  .action(createFile);

program.on("--help", () => {
  console.log(
    "\r\n" +
      figlet.textSync("moment", {
        font: "Ogre",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 180,
        whitespaceBreak: true,
      })
  );
});

program.parse(process.argv);
