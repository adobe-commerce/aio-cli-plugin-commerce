# aio-cli-plugin-commerce

`commerce` commands for the Adobe I/O CLI

<!-- toc -->
* [Prerequisites](#prerequisites)
* [Usage](#usage)
* [Commands](#commands)
* [Troubleshooting](#troubleshooting)
<!-- tocstop -->

![image](https://github.com/user-attachments/assets/7cd45e4b-945a-4e13-909d-b1fe2c426fe0)

## Note

There is currently a known issue affecting aio-cli so you will see a warning related to `punycode`. This does not impact
functionality. Follow here: https://github.com/adobe/aio-cli/issues/679

## Prerequisites

❗ You must have Node >= 22. Consider using [nvm](https://formulae.brew.sh/formula/nvm) to manage multiple versions.

❗ You must have the [aio CLI](https://developer.adobe.com/runtime/docs/guides/tools/cli_install/) installed.

❗ You must have the [gh CLI tool](https://cli.github.com/) installed and authenticated before using this plugin.

```sh
brew install gh
gh auth login
```

❗ You must also log in to the Adobe I/O CLI using your credentials.

```sh
# logout/clear config
aio config clear
# set cli env to "prod" or "stage"
aio config set cli.env prod
# trigger login and select your org
aio console org select
```

## Troubleshooting

### Instance Selection

Sometimes your AIO authentication can become invalid. You must first `aio logout` and then `aio login`. Also verify you are using the correct cli environment (`stage` or `prod`).

### Wrong Org

If you are already authenticated to experience.adobe.com with a specific org selected, the aio login command will use that authentication. If this does not match the org you are trying to use, you will need to log out and log in again.

### Further steps

If you are still having problems, please open an issue and confirm that you:

- can consistently reproduce the issue
- are able to obtain the full error output using `AIO_LOG_LEVEL=debug aio commerce extensibility app-setup`.
- verify you are in the correct IMS environment (`aio config set cli.env <env>`)
- verify you are authorized to the correct IMS org (`aio config get console.org`)
- Sign out of https://experience.adobe.com first before running the CLI, as this may “auto select” the wrong org
- verify you are authorized to the correct gh user (`gh auth status`)

Additionally, please provide exact steps/inputs you chose in order to reproduce the issue.

# Usage

```sh-session
$ aio plugins:install https://github.com/adobe-commerce/aio-cli-plugin-commerce
$ # OR to install a specific tag
$ aio plugins:install https://github.com/adobe-commerce/aio-cli-plugin-commerce#semverX.Y.Z
```

# Commands
<!-- commands -->
* [`aio commerce extensibility app-setup`](#aio-commerce-extensibility-app-setup)
* [`aio commerce extensibility tools-setup`](#aio-commerce-extensibility-tools-setup)
* [`aio commerce dev`](#aio-commerce-dev)

## `aio commerce extensibility app-setup`

```
USAGE
  $ aio commerce extensibility app-setup [-s <value>] [-n <value>] [-a <value>] [-p npm|yarn] [-v <value>] [-f]

FLAGS
  -s, --starter-kit=<value>      Starter kit folder (e.g. integration-starter-kit, checkout-starter-kit, aem-boilerplate-commerce)
  -n, --project-name=<value>     Name for the project directory
  -a, --agent=<value>            Coding agent to install skills for (see Supported Agents in tools-setup)
  -p, --package-manager=<option> Package manager: npm or yarn
  -v, --tools-version=<value>    Version of commerce-extensibility-tools to install (default: latest)
  -f, --force                    Force overwrite of existing MCP configuration in tools-setup

DESCRIPTION
  Setup your Commerce Extensibility app: clone starter kit, configure aio console,
  install dependencies, and run tools-setup

EXAMPLES
  $ aio commerce extensibility app-setup
  $ aio commerce extensibility app-setup --starter-kit integration-starter-kit --project-name my-app --agent Cursor
  $ aio commerce extensibility app-setup -s checkout-starter-kit -n checkout-app -a Cursor -p npm
  $ aio commerce extensibility app-setup -s aem-boilerplate-commerce -n storefront -a Cursor
```

This command automates the full project setup workflow for Commerce Extensibility. It runs the following steps:

1. **Login check** — verifies you are authenticated via `aio auth login`
2. **Starter kit selection** — prompts for Integration Starter Kit, Checkout Starter Kit, or AEM Boilerplate Commerce
3. **Project name** — prompts for a directory name for the new project
4. **Agent selection** — prompts for which coding agent to install skills for
5. **Clone and install** — clones the starter kit repo and installs dependencies
6. **Console configuration** _(Integration/Checkout only)_ — selects Adobe I/O Console org, project, and workspace
7. **Workspace credentials** _(Integration/Checkout only)_ — creates OAuth server-to-server credentials and subscribes to required services (ACCS REST API, I/O Management API, I/O Events, Adobe I/O Events for Adobe Commerce)
8. **Kit-specific setup** _(Integration/Checkout only)_ — creates `.env` from template, configures Commerce instance, downloads workspace config, populates workspace IDs and OAuth credentials
9. **Tools setup** — runs `tools-setup` to install Commerce Extensibility MCP tools and agent skills

All flags are optional. When omitted, the command prompts interactively. When all flags are provided, the command runs non-interactively.

## `aio commerce dev`

```
USAGE
  $ aio commerce dev

DESCRIPTION
  one command to clone, install, and run the local development server.

EXAMPLES
  $ aio commerce:dev
```

## `aio commerce extensibility tools-setup`

```
USAGE
  $ aio commerce extensibility tools-setup [-v <value>] [-s <value>] [-a <value>] [-p npm|yarn] [-f]

FLAGS
  -v, --tools-version=<value>    Version of @adobe-commerce/commerce-extensibility-tools to install (defaults to latest)
  -s, --starter-kit=<option>     Starter kit to use. e.g. "integration-starter-kit"
  -a, --agent=<value>            Coding agent to configure (see Supported Agents below)
  -p, --package-manager=<option> Package manager: "npm" or "yarn" (auto-detected from lock files if omitted)
  -f, --force                    Force overwrite of existing MCP configuration without prompting

DESCRIPTION
  Setup Commerce Extensibility Tools with Agent Skills for your coding agent

EXAMPLES
  $ aio commerce:extensibility:tools-setup
  $ aio commerce:extensibility:tools-setup --tools-version 1.2.3
  $ aio commerce:extensibility:tools-setup --starter-kit integration-starter-kit --agent Cursor --package-manager npm
  $ aio commerce:extensibility:tools-setup --starter-kit aem-boilerplate-commerce --agent Cursor --package-manager npm
  $ aio commerce:extensibility:tools-setup -s integration-starter-kit -a Cursor -p npm -f
```

This command sets up Commerce Extensibility Tools for use with your preferred coding agent using [Agent Skills](https://agentskills.io/), an open standard for giving AI coding agents domain-specific expertise. The command will:

1. Prompt you to select a **starter kit** (e.g. Integration Starter Kit, Checkout Starter Kit, or AEM Boilerplate Commerce)
2. Prompt you to select your **coding agent** from 9 supported agents (plus an "Other" option)
3. Install the `@adobe-commerce/commerce-extensibility-tools` package as a dev dependency
4. Create MCP (Model Context Protocol) configuration for your agent
5. Copy `AGENTS.md` to your project root (top-level agent instructions)
6. Copy skill folders (architect, developer, tester, tutor, etc.) to your agent's skills directory
7. Copy `examples` and `references` folders (if provided by the starter kit) alongside the skills directory

### Supported Agents

| Agent | Skills Path | MCP Config |
|-------|------------|------------|
| Cursor | `.cursor/skills/` | `.cursor/mcp.json` |
| Claude Code | `.claude/skills/` | `.mcp.json` |
| GitHub Copilot | `.github/skills/` | `.vscode/mcp.json` |
| Windsurf | `.windsurf/skills/` | Global: `~/.codeium/windsurf/mcp_config.json` |
| Gemini CLI | `.gemini/skills/` | `.gemini/settings.json` |
| OpenAI Codex | `.agents/skills/` | `.codex/config.toml` |
| Cline | `.cline/skills/` | Global: VS Code extension storage |
| Kilo Code | `.kilocode/skills/` | `.kilocode/mcp.json` |
| Antigravity | `.agent/skills/` | `.agent/mcp_config.json` |
| Other | `./skills/` (project root) | Manual setup required |

### Flags Reference

| Flag | Short | Description |
|------|-------|-------------|
| `--tools-version` | `-v` | Version of the tools package to install. Accepts semver (`1.2.3`, `^1.2.3`), ranges (`>=1.0.0`), or npm tags (`latest`, `next`). Defaults to `latest`. |
| `--starter-kit` | `-s` | Starter kit folder name. e.g. `integration-starter-kit`, `checkout-starter-kit`, `aem-boilerplate-commerce`. |
| `--agent` | `-a` | Coding agent name: `Cursor`, `Claude Code`, `GitHub Copilot`, `Windsurf`, `Gemini CLI`, `OpenAI Codex`, `Cline`, `Kilo Code`, `Antigravity`, `Other`. |
| `--package-manager` | `-p` | Package manager: `npm` or `yarn`. Auto-detected from lock files when omitted (see below). |
| `--force` | `-f` | Force overwrite of existing MCP configuration without prompting for confirmation. |

All flags are optional. When a flag is omitted, the command will prompt interactively. When all flags are provided, the command runs fully non-interactively, making it suitable for CI/CD pipelines.

### Package Manager Auto-Detection

When `--package-manager` is not provided, the command automatically detects the package manager by checking for lock files in your project directory:

- **`yarn.lock` found** (no `package-lock.json`): uses `yarn`
- **`package-lock.json` found** (no `yarn.lock`): uses `npm`
- **Both or neither found**: prompts you to choose

To override auto-detection, either pass `--package-manager` explicitly or delete the unwanted lock file.

### CI / Automation

To run the setup without any interactive prompts (e.g. in a CI pipeline), provide all flags:

```sh
aio commerce:extensibility:tools-setup \
  --starter-kit integration-starter-kit \
  --agent Cursor \
  --package-manager npm \
  --force
```

Navigate to your project directory before running the command. After setup, restart your coding agent to load the new MCP tools and skills.
<!-- commandsstop -->

## Local Development

```sh
git clone git@github.com:adobe-commerce/aio-cli-plugin-commerce.git
cd aio-cli-plugin-commerce
npm install
aio plugins:link commerce
```

## Logging

Uses [winston](https://github.com/winstonjs/winston) internally.

Use `AIO_LOG_LEVEL=debug|verbose|info|warn|error <command>` to see full logs.

```sh
AIO_LOG_LEVEL=debug aio commerce:extensibility:tools-setup
```

## Contributing

Contributions are welcomed! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
