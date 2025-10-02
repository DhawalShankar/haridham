# Haridham CLI

Haridham CLI (`hari`) is a custom terminal interface and Git wrapper designed to simplify Git operations with branded commands. It allows users to manage repositories locally, run Git commands, and interact with an interactive terminal environment.

---

## Features

* Interactive terminal (`haridham>`) for command input.
* Branded commands:

  * `hari srajan <repo>` → Create a new local repository
  * `hari drishti` → List all local repositories
* Full Git command support as fallback (`status`, `add`, `commit`, `push`, `pull`, etc.)
* Works on Windows, Linux, and macOS.
* Easy to run globally via `npm link`.

---

## Installation

1. Clone the repository:

```
git clone <your-repo-url>
cd haridham-backend
```

2. Install dependencies:

```
npm install
```

3. Link globally for CLI access:

```
npm link
```

---

## Usage

Launch the interactive terminal:

```
hari
```

You will see the prompt:

```
haridham>
```

---

### Example Commands

* Create a new repository:

```
haridham> hari srajan my-project
```

* List repositories:

```
haridham> hari drishti
```

* Run Git commands (works like normal Git):

```
haridham> status
haridham> add .
haridham> commit -m "Initial commit"
haridham> push origin main
```

* Exit the terminal:

```
haridham> exit
```

* Show help:

```
haridham> help
```

---

## Project Structure

```
haridham-backend/
├─ hari.js           # CLI entrypoint
├─ repos/            # Local repositories storage
├─ package.json
└─ node_modules/
```

---

## Notes

* This is a **mini project MVP**, focusing on CLI and interactive Git workflow.
* Future enhancements can include:

  * Remote repository integration (GitHub/GitLab/Haridham server)
  * Additional branded commands (`suci` for issues, etc.)
  * Colorful terminal UI or menus

---

## License

MIT License

---
