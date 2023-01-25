import shell from "shelljs";
import fs from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";
import path from "path";
import chalk from "chalk";

import { links, fileTypeTemplate, fileTypeLinks } from "./utils/links.js";
import { loading, autoImportReducer } from "./utils/index.js";
import {
  isRemoveExitMatter,
  questions,
  addFile,
  fileType,
} from "./utils/questions.js";
import { compile, writeToFile } from "./utils/index.js";
import { dependencies } from "./utils/constant.js";

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

    shell.cd(`${process.cwd()}/${matter}`);
    if (answers.install === "yes") {
      loading(`${answers.tool} install`, "正在安装相关依赖,请骚等");
    }
  });
}

export async function createFile() {
  const { filename } = await inquirer.prompt(addFile);

  const reg = /^[a-z]+$/;
  if (!reg.test(filename)) {
    console.log(chalk.redBright("输入文件名格式有误,请重新输入"));
    process.exit(1);
  }

  const { filetype } = await inquirer.prompt(fileType);

  const result = await compile(fileTypeTemplate.get(filetype), {
    filename,
    toUpperCase: filename
      .toLowerCase()
      .replace(/( |^)[a-z]/g, (L) => L.toUpperCase()),
  });

  const suffix = fs.existsSync("tsconfig.json") ? "t" : "j";
  const fileTypeMap = fileTypeLinks(suffix, filename);

  // 路径拼接
  const targetPath = path.resolve(
    fileTypeMap.get(filetype)[0],
    fileTypeMap.get(filetype)[1]
  );
  writeToFile(targetPath, result);

  // 如果是redux且没有全局入口文件入口文件
  if (filetype === "redux") {
    const router = path.resolve("src/store", `index.${suffix}s`);
    if (!fs.existsSync(router)) {
      const result = await compile("redux-entry.ejs", {
        isTypescript: suffix === "t" ? true : false,
      });
      writeToFile(router, autoImportReducer(result, filename));
    } else {
      const data = fs.readFileSync(router, "utf8");
      writeToFile(router, autoImportReducer(data, filename));
    }

    if (Object.hasOwn(dependencies, "@reduxjs/toolkit") === false) {
      console.log(
        chalk.redBright(
          `检查到 package.json 文件中缺少  "@reduxjs/toolkit" 依赖,请尽快安装`
        )
      );
    }
  }
  console.log(chalk.greenBright("文件创建成功"));
}
