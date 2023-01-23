import ora from "ora";
import shell from "shelljs";
import ejs from "ejs";
import { fileURLToPath } from "url";
import fs from "fs";

import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function loading(command, message) {
  const spinner = ora(message);
  spinner.start();
  shell.exec(command);
  spinner.succeed();
}

export function compile(template, data) {
  const templatePosition = `../template/${template}`;
  const templatePath = path.resolve(__dirname, templatePosition);

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
}

// 创建文件
function createDirSync(router) {
  console.log(router);
  const result = router.slice(process.cwd().length + 1).split("\\");
  let index = ".";
  for (const name of result) {
    if (name.indexOf(".") !== -1) {
      break;
    }
    index += `/${name}`;
    if (!fs.existsSync(index)) fs.mkdirSync(index);
  }
}

export const writeToFile = (path, content) => {
  createDirSync(path);
  return fs.promises.writeFile(path, content);
};

// 自动导入reducer
export function autoImportReducer(data, filename) {
  return data
    .replace(/^(import)(\s|\S)*from(\s|\.)*('|").*('|"|;)/m, (content) => {
      return content + `\nimport fs from "fs";`;
    })
    .replace(/(?<=(reducer:(\s)*{))(\s|\S)*(?=(},))/, (content) => {
      if (content === "") return content + `${filename}`;
      return content + `,${filename}`;
    });
}
