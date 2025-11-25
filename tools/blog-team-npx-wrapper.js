#!/usr/bin/env node

/**
 * NPX Wrapper for blog-team CLI
 * Detects npx execution and preserves user's working directory
 * Checks for newer versions and warns user
 */

const { spawn, execSync } = require('child_process');
const path = require('path');
const https = require('https');

const currentVersion = require('../package.json').version;

/**
 * Check npm registry for latest version
 */
function checkForUpdates() {
  return new Promise((resolve) => {
    const req = https.get('https://registry.npmjs.org/blog-team/latest', {
      timeout: 3000,
      headers: { 'Accept': 'application/json' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const latest = JSON.parse(data).version;
          resolve(latest);
        } catch {
          resolve(null);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
  });
}

/**
 * Compare semver versions
 */
function isNewer(latest, current) {
  if (!latest || !current) return false;
  const l = latest.split('.').map(Number);
  const c = current.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if (l[i] > c[i]) return true;
    if (l[i] < c[i]) return false;
  }
  return false;
}

async function main() {
  // Check for updates (non-blocking, won't slow down CLI)
  const latestVersion = await checkForUpdates();

  if (latestVersion && isNewer(latestVersion, currentVersion)) {
    console.log('\x1b[33m╭─────────────────────────────────────────────────────────╮\x1b[0m');
    console.log('\x1b[33m│\x1b[0m  Update available: \x1b[90m' + currentVersion + '\x1b[0m → \x1b[32m' + latestVersion + '\x1b[0m                     \x1b[33m│\x1b[0m');
    console.log('\x1b[33m│\x1b[0m  Run: \x1b[36mnpx blog-team@' + latestVersion + ' install\x1b[0m to update         \x1b[33m│\x1b[0m');
    console.log('\x1b[33m╰─────────────────────────────────────────────────────────╯\x1b[0m');
    console.log('');
  }

  // Detect if running via npx
  const isNpx = __dirname.includes('_npx') || __dirname.includes('.npm');

  if (isNpx) {
    // Running via npx - spawn the CLI with user's working directory
    const cliPath = path.join(__dirname, 'cli', 'blog-team-cli.js');
    const args = process.argv.slice(2);

    const child = spawn('node', [cliPath, ...args], {
      stdio: 'inherit',
      cwd: process.cwd()
    });

    child.on('exit', (code) => {
      process.exit(code || 0);
    });
  } else {
    // Running from local installation - execute directly
    require('./cli/blog-team-cli.js');
  }
}

main();
