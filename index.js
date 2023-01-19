#!/usr/bin/env node

import { Command } from "commander";
import { answerHandle } from "./bin/core/index.js";
// import result from "./package.json" assert { type: "json" };
import chalk from "chalk";
import figlet from "figlet";

const program = new Command();

// program.version(chalk.greenBright(result.version));

program
  .command("create-app <project-name>")
  .description("Create a directory for your project files")
  .action(answerHandle);

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
