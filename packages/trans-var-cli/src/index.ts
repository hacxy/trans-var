#!/usr/bin/env node
import chalk from "chalk";
import prompts from "prompts";
import ora from "ora";
import { getVarByCiba } from "trans-var";
import clipboardy from "clipboardy";

const bootstrap = async () => {
  const promptsResult = await prompts(
    {
      type: "text",
      name: "name",
      message: "输入变量名:",
    },
    {
      onCancel: () => {
        console.log(chalk.red("❌ 取消输入"));
        process.exit(1);
      },
    }
  );

  const spinner = ora("Loading ...").start();
  const result = await getVarByCiba(promptsResult.name);

  spinner.succeed("获取变量成功");

  if (result) {
    const finalVar = await prompts(
      {
        type: "select",
        name: "value",
        message: "请选择变量:",
        choices: Object.values(result).map((value: string) => {
          return {
            title: value,
            value: value,
          };
        }),
      },
      {
        onCancel() {
          // 取消选择
          console.log(chalk.red("❌ 操作取消"));
          process.exit(1);
        },
      }
    );
    clipboardy.writeSync(finalVar.value);
    console.log();
    console.log(finalVar.value + chalk.dim(" 已复制到剪贴板"));
  } else {
    spinner.warn("无法翻译此变量");
  }
};

bootstrap();
