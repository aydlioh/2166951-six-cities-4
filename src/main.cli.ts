#!/usr/bin/env node

import {
  CLIApplication,
  HelpCommand,
  ImportCommand,
  VersionCommand,
  GenerateCommand,
} from './cli/index.js';

const bootstrap = () => {
  const cli = new CLIApplication().registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  cli.processCommand(process.argv);
};

bootstrap();
