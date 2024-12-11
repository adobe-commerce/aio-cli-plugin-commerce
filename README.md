# aio-cli-plugin-commerce

`commerce` commands for the Adobe I/O CLI

<!-- toc -->
* [aio-cli-plugin-boilerplate](#aio-cli-plugin-boilerplate)
* [Prerequisites](#prerequisites)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Prerequisites

!! You must have the [gh CLI tool](https://cli.github.com/) installed and authenticated before using this plugin.

```
brew install gh
gh auth login
```

# Usage

```sh-session
$ aio plugins:install @adobe/aio-cli-plugin-commerce
$ # OR
$ aio discover -i
$ aio commerce --help
```

# Commands
<!-- commands -->
* [`aio help [COMMAND]`](#aio-help-command)
* [`aio commerce`](#aio-pluginname)
* [`aio commerce hello [NAME]`](#aio-pluginname-hello-name)

## `aio help [COMMAND]`

Display help for aio.

```
USAGE
  $ aio help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for aio.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.6/src/commands/help.ts)_

## `aio commerce`

```
USAGE
  $ aio commerce

DESCRIPTION
  Scaffold your own Adobe Commerce on EDS storefront
```

## `aio commerce scaffold`

```
USAGE
  $ aio commerce scaffold [-o <value>] [-r <value>]

FLAGS
  -o, --org=<value>   your github org, ie "hlxsites"
  -r, --repo=<value>  your github repo, ie "aem-boilerplate-commerce"

DESCRIPTION
  Scaffold your own Adobe Commerce on EDS storefront

EXAMPLES
  $ aio commerce:scaffold --org sirugh --repo my-storefront
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
<!-- commandsstop -->

## Contributing

Contributions are welcomed! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

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
AIO_LOG_LEVEL=debug aio commerce:scaffold
```

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
