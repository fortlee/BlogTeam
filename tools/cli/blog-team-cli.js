#!/usr/bin/env node

/**
 * Blog Team CLI
 * Main command-line interface for blog-team
 */

const { Command } = require('commander');
const path = require('path');
const fs = require('fs-extra');

const program = new Command();

program
  .name('blog-team')
  .description('AI-powered blog writing and editing team')
  .version('1.0.0');

// Dynamically load commands from commands directory
const commandsDir = path.join(__dirname, 'commands');
if (fs.existsSync(commandsDir)) {
  const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const commandModule = require(path.join(commandsDir, file));
    if (typeof commandModule === 'function') {
      commandModule(program);
    }
  }
}

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
