# Local Repository Setup/Reset

## Overview

The following documents assumes that you have properly cloned the remote repository (GitHub Repo) into your Computer.<br>
If you are using WSL, refer to [WSL_AND_GITHUB_DESKTOP.md](WSL_AND_GITHUB_DESKTOP.md)

## Linux & MacOS (Using Homebrew) Commands for Setup

One-time Global Install for the MERN Stack on Computer:

1. Install Node Version Manager (Any Version for now)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

2. sing NVM, install & use the latest Node Version Manager

```bash
nvm install --lts
nvm use --lts
```

- Afterwards, nvm is now installed in your computer globally. Additionally, nvm will also install all the necessary programs for a MERN stack

3. Install PNPM globally using npm (Should be installed by nvm)

```bash
npm install -g pnpm
```

- To check to see if pnpm exists, use:

```bash
pnpm --version
```

## Running/Building the Project:

Firstly, we will build the project using turbo. Turbo is nice since it does the following:

- Analyze all dependencies within the project and install and update all necessary packages and dependencies.
- Caches unmodified dependencies to create a fast build time to launch frontend and backend at the same time.

(In the below example, “LargeProject” is the local repository’s name)<br>
We run “pnpm run dev” to be able to install pnpm and turbo inside the directory:

```bash
cd LargeProject
pnpm run dev
pnpm turbo build
```

Afterwards, Turbo will now be able to run optimized to start the program at a fast speed.<br>
To run the program, just run the following:

```bash
cd LargeProject
pnpm turbo dev
```

## Adding .env files and .gitignore files

This file has the file known as .gitignore. This file is used to tell Git what to ignore when commits are made. If you look at the .gitignore file in the root directory of the repo, you can see that there is a list of files that we ignore when we commit to GitHub.<br>
That is why you don’t see node_modules in GitHub and other setup folders that we don’t need everyone sharing.

Using the command “pnpm turbo build” or “pnpm turbo dev” will mostly add all of the setup files that the project needs to be able to run everything.<br>
However, .env files (Environment Files) are ignored.

Since GitHub is open to the public, we can’t ensure that our sensitive information/passwords can be kept safe when we upload the information to the Web.

That is why we are using .env files that are ignored to keep sensitive data from being leaked (Also some services will disable your account if they see their keys/passwords on GitHub)

Since packages/api/package.json is currently the the one with “dotenv” within its dependencies,<br>
So in packages/api create an .env file (So server.js can access the important information) based off .env.example and credentials found in discord.
