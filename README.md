# aio-cli-plugin-commerce

`commerce` commands for the Adobe I/O CLI

<!-- toc -->
* [aio-cli-plugin-boilerplate](#aio-cli-plugin-boilerplate)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

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

<!-- YOUR DESCRIPTION HERE -->

USAGE
  $ aio commerce

DESCRIPTION
  Your description here
```

## `aio commerce hello [NAME]`

A hello world sample command.

```
USAGE
  $ aio commerce hello [NAME] [-f <value>]

ARGUMENTS
  NAME  name to print

FLAGS
  -f, --someflag=<value>  this is some flag

DESCRIPTION
  A hello world sample command.

EXAMPLES
  $ aio commerce:hello myself -f myflag
```
<!-- commandsstop -->

## Contributing

Contributions are welcomed! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

## Local Development

```sh
git clone git@github.com:adobe-commerce/aio-cli-plugin-commerce.git
cd aio-cli-plugin-commerce
aio plugins:link commerce
```

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
