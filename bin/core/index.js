import shell from "shelljs";
import chalk from "chalk";
import links from "../utils/links.js";
import fs from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";

import { loading } from "../utils/loading.js";
import { isRemoveExitMatter, questions } from "../utils/questions.js";

const path = process.cwd();

export async function answerHandle(matter) {
  if (fs.existsSync(matter)) {
    await inquirer.prompt(isRemoveExitMatter).then(async (answers) => {
      if (answers.isRemove === "yes") {
        const spinner = ora("正在删除已经存在的文件");
        spinner.start();
        await fs.remove(matter);
        spinner.succeed();
      } else {
        process.exit(1);
      }
    });
  }

  inquirer.prompt(questions).then((answers) => {
    shell.exec(`mkdir ${matter}`);

    loading(
      `git clone ${links.get(answers.framework)} ${matter}`,
      "正在远程拉取模板代码,请稍等"
    );

    console.log(chalk.green(`🖨️  Cloned started files into ${matter}`));
    shell.cd(`${path}/${matter}`);
    if (answers.install === "yes") {
      loading(`${answers.tool} install`, "正在安装相关依赖,请骚等");
    }
    console.log(
      chalk.green(
        "👨‍💻 Successfully installed all the required dependencies\nHappy hacking 🚀"
      )
    );
  });
}
