#!/usr/bin/env node

import {
  CLIApplication,
  HelpCommand,
  ImportCommand,
  VersionCommand,
} from './cli/index.js';

const bootstrap = () => {
  const cli = new CLIApplication().registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
  ]);

  cli.processCommand(process.argv);
};

bootstrap();
