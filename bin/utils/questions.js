import { lightGreen, lightRed } from "kolorist";

export const questions = [
  {
    type: "list",
    name: "framework",
    message: lightGreen(
      "Please select the project template that you will use:"
    ),
    choices: ["React-Ts", "React", "Angular", "Svelte", "VueJS"],
  },
  {
    type: "list",
    name: "tool",
    message: lightGreen("Select the package management tool you will use:"),
    choices: ["npm", "yarn", "cnpm", "pnpm"],
  },
  {
    type: "list",
    name: "install",
    message: lightGreen(
      "Whether to automatically install default dependencies:"
    ),
    choices: ["yes", "no"],
  },
];

export const isRemoveExitMatter = [
  {
    type: "list",
    name: "isRemove",
    message: lightRed("Whether to overwrite the current directory:"),
    choices: ["yes", "no"],
  },
];

export const addFile = [
  {
    type: "input",
    message: "请输入你要创建的文件名",
    name: "filename",
  },
];

export const fileType = [
  {
    type: "list",
    name: "filetype",
    message: lightGreen("请选择文件的类型:"),
    choices: ["component", "page", "axios", "redux"],
  },
];
