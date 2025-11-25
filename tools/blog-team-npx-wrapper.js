#!/usr/bin/env node

/**
 * NPX Wrapper for blog-team CLI
 * Detects npx execution and preserves user's working directory
 */

const { spawn } = require('child_process');
const path = require('path');

// Detect if running via npx
const isNpx = __dirname.includes('_npx') || __dirname.includes('.npm');

if (isNpx) {
  // Running via npx - spawn the CLI with user's working directory
  const cliPath = path.join(__dirname, 'cli', 'blog-team-cli.js');
  const args = process.argv.slice(2);

  const child = spawn('node', [cliPath, ...args], {
    stdio: 'inherit',
    cwd: process.cwd() // Preserve user's working directory
  });

  child.on('exit', (code) => {
    process.exit(code || 0);
  });
} else {
  // Running from local installation - execute directly
  require('./cli/blog-team-cli.js');
}
