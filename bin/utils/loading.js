import ora from "ora";
import shell from "shelljs";

export function loading(command, message) {
  const spinner = ora(message);
  spinner.start();
  shell.exec(command);
  spinner.succeed();
}
