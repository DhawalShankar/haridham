
# Haridham CLI

Haridham CLI is an **interactive terminal tool for Windows** that simplifies Git commands with `hari`-prefixed shortcuts while also supporting all normal Windows terminal commands. It shows your **current folder** when navigating (`cd`) or creating directories (`mkdir`).  

---

## **Features**

### Custom `hari` Commands (Git Shortcuts)

| Haridham Command       | Description                                |
|-----------------------|--------------------------------------------|
| `hari srajan`         | Initialize a Git repository (`git init`) in the current folder |
| `hari drishti`        | Show Git status (`git status`)            |
| `hari yog <files>`    | Stage files for commit (`git add <files>`) |
| `hari samarpit <msg>`   | Commit changes (`git commit -m "<msg>"`) |
| `hari bhejo`           | Push to the remote repository (`git push`) |
| `hari lao`           | Pull from the remote repository (`git pull`) |
| `hari khoj`            | Show commit history (`git log`)           |

> Unknown `hari <command>` automatically runs as `git <command>`.

---

### Normal Windows Commands

- Run any terminal command (`dir`, `echo`, `npm install`, etc.)  
- `cd <folder>` → changes directory and shows current folder  
- `mkdir <folder>` → creates folder and shows current folder   

---

## **Installation**

1. Clone the repository:  
```powershell
git clone <repo-url>
cd haridham-cli
````

2. Run the CLI:

```powershell
node haridham.js or hari
```

---

## **Usage Examples**

```powershell
haridham> hari srajan
Initialized empty Git repository in C:\Users\User\projects

haridham> hari drishti
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean

haridham> hari yog .
haridham> hari commit "Initial commit"
[main (root-commit) abc123] Initial commit
 1 file changed, 1 insertion(+)

haridham> mkdir myfolder
Directory created: C:\Users\User\projects\myfolder
Current folder: C:\Users\User\projects

haridham> cd myfolder
Moved to folder: C:\Users\User\projects\myfolder

haridham> dir
```

---

### Help Command

```powershell
haridham> help
```

Displays a list of available `hari` commands and usage instructions.

---

## **License**

MIT License — free to use, modify, and distribute.


