import { CommandParser } from './utils/command-parser.js';
import { Command, ICommand } from './commands/index.js';

type CommandCollection = Record<string, ICommand>;

export class CLIApplication {
  constructor(
    private commands: CommandCollection = {},
    private readonly defaultCommand: string = Command.Help
  ) {}

  public registerCommands(commandList: ICommand[]): CLIApplication {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered`);
      }

      this.commands[command.getName()] = command;
    });

    return this;
  }

  public getDefaultCommand(): ICommand | never {
    if (!this.commands[this.defaultCommand]) {
      throw new Error(
        `The default command (${this.defaultCommand}) is not registered.`
      );
    }

    return this.commands[this.defaultCommand];
  }

  public getCommand(commandName: string): ICommand {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const commandName = Object.keys(parsedCommand)[0];
    const command = this.getCommand(commandName);
    const commandArgs = parsedCommand[commandName] ?? [];
    command.execute(...commandArgs);
  }
}
