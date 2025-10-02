#!/usr/bin/env node

const readline = require('readline');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Directory to store local repos
const REPOS_DIR = path.join(__dirname, 'repos');
if (!fs.existsSync(REPOS_DIR)) fs.mkdirSync(REPOS_DIR, { recursive: true });

// Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'haridham> '
});

console.log('Welcome to Haridham CLI!');
console.log('Type "help" for commands or "exit" to quit.\n');

rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();
  if (!input) {
    rl.prompt();
    return;
  }

  const [cmd, ...args] = input.split(' ');

  // Exit command
  if (cmd === 'exit') {
    rl.close();
    return;
  }

  // Help command
  if (cmd === 'help') {
    console.log(`
Haridham CLI Commands:

srajan <repo>   : Create a new local repository
drishti         : List all local repositories
<git command>   : Any Git command works (status, commit, push, pull, etc.)
exit            : Quit Haridham CLI
`);
    rl.prompt();
    return;
  }

  // Branded command: srajan (create repo)
  if (cmd === 'hari srajan') {
    const repoName = args[0];
    if (!repoName) {
      console.log('Usage: srajan <repo-name>');
      rl.prompt();
      return;
    }
    const repoPath = path.join(REPOS_DIR, repoName);
    if (fs.existsSync(repoPath)) {
      console.log(`Repository "${repoName}" already exists.`);
      rl.prompt();
      return;
    }
    fs.mkdirSync(repoPath, { recursive: true });
    exec(`git init ${repoPath}`, (err, stdout, stderr) => {
      if (err) console.error(err.message);
      else console.log(`Repository "${repoName}" created at ${repoPath}`);
      rl.prompt();
    });
    return;
  }

  // Branded command: drishti (list repos)
  if (cmd === 'hari drishti') {
    const repos = fs.existsSync(REPOS_DIR) ? fs.readdirSync(REPOS_DIR) : [];
    if (!repos.length) console.log('No repositories found.');
    else console.log('Repositories:', repos.join(', '));
    rl.prompt();
    return;
  }

  // Fallback: run as Git command
  exec(`git ${input}`, (err, stdout, stderr) => {
    if (err) console.error(err.message);
    if (stderr) console.error(stderr);
    if (stdout) console.log(stdout);
    rl.prompt();
  });
}).on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
});
