/**
 * Install Command
 * Handles blog-team installation into a repository
 */

const Installer = require('../installers/installer');
const chalk = require('chalk');
const boxen = require('boxen');
const path = require('path');
const fs = require('fs');

module.exports = (program) => {
  program
    .command('install')
    .description('Install blog-team into the current repository')
    .option('-f, --force', 'Force reinstall even if already installed')
    .option('-d, --dir <directory>', 'Custom installation directory (default: .blog-team)')
    .action(async (options) => {
      try {
        // Read version from package.json
        const packageJson = JSON.parse(
          fs.readFileSync(path.join(__dirname, '../../../package.json'), 'utf8')
        );
        const version = packageJson.version;

        console.log(boxen(
          chalk.bold.cyan('Blog Team Installer\n') +
          chalk.gray('Setting up your AI-powered blog writing team\n') +
          chalk.gray('Version: ') + chalk.white(version),
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'cyan'
          }
        ));

        const installer = new Installer(process.cwd(), options);
        await installer.run();

        console.log(boxen(
          chalk.bold.green('✓ Installation Complete!\n') +
          chalk.gray('Blog Team v') + chalk.white(version) + chalk.gray(' is ready to use\n\n') +
          chalk.white('Get started:\n') +
          chalk.cyan('1. ') + chalk.gray('Type ') + chalk.yellow('/blog-team:brainstorm') + chalk.gray(' in Claude Code\n') +
          chalk.cyan('2. ') + chalk.gray('Start creating your first blog post!\n') +
          chalk.cyan('3. ') + chalk.gray('Check ') + chalk.yellow('README.md') + chalk.gray(' for progress tracking'),
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'green'
          }
        ));

      } catch (error) {
        console.error(chalk.bold.red('\n✗ Installation failed:'), error.message);
        process.exit(1);
      }
    });
};
