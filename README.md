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

❗ The Github account used by the CLI must have permission to create repositories (_write access_) and install Github Applications on that repository.

### Mesh Prerequisites

The prerequisites in this section are only necessary if you are provisioning API Mesh for your storefront.

❗ You must have _developer access_ in [Adobe Developer Console](developer.adobe.com/console) to create Meshes. Please make sure you have the correct entitlements and also accept the terms and conditions of the Developer Console.

❗ You must also have the `api-mesh` plugin installed if you wish to use mesh provisioning.

```sh
aio plugins:install @adobe/aio-cli-plugin-api-mesh
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

### Name Restrictions

Due to AEM restrictions on subdomains the full project url cannot exceed 63 characters. You also cannot use the `_` character.

⚠️ Consider using a short name, and hyphens instead of underscores.

### Mesh Provisioning

If you choose a workspace with a pre-existing mesh, the mesh provisioning will fail. Create or choose an empty workspace, or delete the pre-existing mesh (only if you are sure it is unused).

### Instance Selection

Sometimes your AIO authentication can become invalid. You must first `aio logout` and then `aio login`. Also verify you are using the correct cli environment (`stage` or `prod`).

### Wrong Org

If you are already authenticated to experience.adobe.com with a specific org selected, the aio login command will use that authentication. If this does not match the org you are trying to use for CCM or API Mesh, you will need to log out and log in again.

### 404

If you see a 404 when you navigate to your storefront url, it can be due to a few reasons. Here are some steps you can take to troubleshoot:

1. **Check the URL**: Ensure that the URL you are trying to access is correct and that there are no typos. The format should be `https://{branch}--{site}--{org}.aem.live`
2. **Check AEM Code Sync Bot**: Ensure that the AEM Code Sync Bot is installed to the correct github repository. _you cannot select "all repositories"!

### Further steps

If you are still having problems, please open an issue and confirm that you:

- can consistently reproduce the issue
- are able to obtain the full error output using `AIO_LOG_LEVEL=debug aio commerce init`.
- verify you have tried using the "demo" backends
- verify you have tried with and without API Mesh
- verify you deleted the mesh before using the CLI (`aio api-mesh:delete`)
- verify you have tried using unique destination repo name
- verify you are in the correct IMS environment (`aio config set cli.env <env>`)
- verify you are authorized to the correct IMS org (`aio config get console.org`)
- Sign out of https://experience.adobe.com first before running the CLI, as this may “auto select” the wrong org
- verify you are authorized to the correct gh user gh auth status

Additionally, please:
- provide the storefront url
- provide exact steps/inputs you chose in order to reproduce the issue

# Usage

```sh-session
$ aio plugins:install https://github.com/adobe-commerce/aio-cli-plugin-commerce
$ # OR to install a specific tag
$ aio plugins:install https://github.com/adobe-commerce/aio-cli-plugin-commerce#semverX.Y.Z
```

# Commands
<!-- commands -->
* [`aio commerce init`](#aio-commerce-init) _(deprecated)_
* [`aio commerce dev`](#aio-pluginname)
* [`aio commerce extensibility tools-setup`](#aio-commerce-extensibility-tools-setup)

## `aio commerce init`

> **⚠️ Deprecated:** This command is deprecated. Use the [Site Creator Tool](https://da.live/app/adobe-commerce/storefront-tools/tools/site-creator/site-creator) instead.

```
USAGE
  $ aio commerce init [-d <value>] [-r <value>] [--skipGit] [--skipMesh] [-t <value>]

FLAGS
  -d, --datasource=<value>  your datasource, ie "https://my-commerce-api.com/graphql
  -r, --repo=<value>        your github repo, ie "my-git-user/my-test-storefront"
  --skipGit                 skip creating Git Repo
  --skipMesh                skip creating API Mesh
  -t, --template=<value>    the template to use, ie "hlxsites/aem-boilerplate-commerce

DESCRIPTION
  Scaffold your own Adobe Commerce on EDS storefront

EXAMPLES
  $  aio commerce:init
  $  aio commerce:init --template "hlxsites/aem-boilerplate-commerce" --skipMesh --repo "my-git-user/my-site"

```

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
  $ aio commerce:extensibility:tools-setup -s integration-starter-kit -a Cursor -p npm -f
```

This command sets up Commerce Extensibility Tools for use with your preferred coding agent using [Agent Skills](https://agentskills.io/), an open standard for giving AI coding agents domain-specific expertise. The command will:

1. Prompt you to select a **starter kit** (e.g. Integration Starter Kit)
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
| `--starter-kit` | `-s` | Starter kit folder name. e.g. `integration-starter-kit`, `checkout-starter-kit`. |
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

## Templates

The requirements for adding or using a template (source site) are:

* The source site github repo is a "template" repo.
* The source site produces a `full-index.json` (see [this](https://admin.hlx.page/config/adobe-commerce/sites/boilerplate/content/query.yaml) for example).

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
