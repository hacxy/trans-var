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
  const varText = await getVarByCiba(promptsResult.name);

  if (varText) {
    clipboardy.writeSync(varText);
    spinner.succeed(varText + chalk.dim(" 已复制到剪贴板"));
  } else {
    spinner.fail("获取变量失败");
  }
};

bootstrap();
