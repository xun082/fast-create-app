import { lightGreen, lightRed } from "kolorist";

const questions = [
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

const isRemoveExitMatter = [
  {
    type: "list",
    name: "isRemove",
    message: lightRed("Whether to overwrite the current directory:"),
    choices: ["yes", "no"],
  },
];

export { questions, isRemoveExitMatter };
