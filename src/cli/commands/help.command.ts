import chalk from 'chalk';
import { ICommand, Command } from './index.js';

export class HelpCommand implements ICommand {
  public getName(): string {
    return Command.Help;
  }

  public async execute(..._args: string[]): Promise<void> {
    console.info(`
      Программа для подготовки данных для ${chalk.bold(chalk.blue('REST API'))} сервера.
      ${chalk.italic('Пример:')}
          cli.js ${chalk.blue('--<command>')} ${chalk.green('[--arguments]')}
      ${chalk.italic('Команды:')}
          ${chalk.blue('--version')}                      ${chalk.gray('# выводит номер версии')}
          ${chalk.blue('--help')}                         ${chalk.gray('# печатает этот текст')}
          ${chalk.blue('--import')} ${chalk.green('<path>')}                ${chalk.gray('# импортирует данные из TSV')}
          ${chalk.blue('--generate')} ${chalk.green('<n> <path> <url>')}    ${chalk.gray('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
