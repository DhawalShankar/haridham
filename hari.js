#!/usr/bin/env node

const readline = require('readline');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Map custom hari commands to git commands
const hariCommands = {
  'srajan': () => execGit('init'),
  'drishti': () => execGit('status'),
  'yog': (args) => execGit('add', args),
  'bhejo': (args) => execGit('push', args),
  'lao': (args) => execGit('pull', args),
  'samarpit': (args) => execGit('commit', args),
  'khoj': (args) => execGit('log', args),
};

// Execute Git commands using spawn
function execGit(command, args = []) {
  const git = spawn('git', [command, ...args], { stdio: 'inherit', shell: true });
  git.on('close', () => rl.prompt());
}

// Execute shell commands
function execShell(commandLine) {
  const [cmd, ...args] = commandLine.split(' ');

  // Handle cd
  if (cmd === 'cd') {
    try {
      const targetDir = args[0] || process.env.HOME; // default to home
      process.chdir(targetDir);
      console.log(`Moved to folder: ${process.cwd()}`);
    } catch (err) {
      console.error(`cd: ${err.message}`);
    }
    rl.prompt();
    return;
  }

  // Handle mkdir
  if (cmd === 'mkdir') {
    const dirName = args[0];
    if (!dirName) {
      console.error('mkdir: missing directory name');
      rl.prompt();
      return;
    }
    const fullPath = path.join(process.cwd(), dirName);
    try {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Directory created: ${fullPath}`);
      console.log(`Current folder: ${process.cwd()}`);
    } catch (err) {
      console.error(`mkdir: ${err.message}`);
    }
    rl.prompt();
    return;
  }

  // Alias ls → dir on Windows
  if (process.platform === 'win32' && cmd === 'ls') {
    commandLine = 'dir';
  }

  const shell = spawn(commandLine, { stdio: 'inherit', shell: true });
  shell.on('close', () => rl.prompt());
}

// Initialize readline
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
  if (!input) return rl.prompt();

  const [first, ...args] = input.split(' ');

  if (first === 'exit') return rl.close();

  if (first === 'help') {
    console.log(`
Haridham CLI Commands:

    hari srajan : Initialize a Git repository (git init) in the current directory
    hari drishti : Show Git status (git status) in the current directory
    hari yog <files> : Stage files for commit (git add <files>)
    hari samarpit <msg> : Commit changes with message (git commit -m "<msg>")
    hari bhejo : Push to the remote repository (git push)
    hari lao : Pull from the remote repository (git pull)
    hari khoj : Show commit history (git log)

Other commands can be used as normal terminal commands.
cd <folder>           : change directory
mkdir <folder>        : create a folder
exit                  : Quit Haridham CLI
`);
    rl.prompt();
    return;
  }

  if (first === 'hari') {
    const subCmd = args[0];
    const subArgs = args.slice(1);
    if (hariCommands[subCmd]) {
      hariCommands[subCmd](subArgs);
    } else {
      // Unknown hari command → treat as git command
      execGit(subCmd, subArgs);
    }
    return; // rl.prompt handled in execGit
  }

  // Not a hari command → run as normal shell command
  execShell(input);

}).on('close', () => {
  console.log('Raam Raam!');
  process.exit(0);
});
