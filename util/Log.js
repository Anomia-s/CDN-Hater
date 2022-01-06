import chalk from "chalk";

const log = console.log;

export default class Log {
  static info(msg) {
    log(`[${chalk.green("INFO")}] -- ${Date.now()} -- [Anomia] -- ${msg}`);
  }

  static error(msg) {
    log(`[${chalk.red("ERROR")}] -- ${Date.now()} -- [Anomia] -- ${msg}`);
  }

  static debug(msg) {
    log(`[${chalk.yellow("DEBUG")}] -- ${Date.now()} -- [Anomia] -- ${msg}`);
  }
}
