# aio-cli-plugin-commerce

`commerce` commands for the Adobe I/O CLI

<!-- toc -->
* [aio-cli-plugin-boilerplate](#aio-cli-plugin-boilerplate)
* [Prerequisites](#prerequisites)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Prerequisites

❗ You must have the [gh CLI tool](https://cli.github.com/) installed and authenticated before using this plugin.

```sh
brew install gh
gh auth login
```

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

### Mesh Provisioning

If you choose a workspace with a pre-existing mesh, the mesh provisioning will fail. Create or choose an empty workspace, or delete the pre-existing mesh (only if you are sure it is unused).

### Instance Selection

Sometimes your AIO authentication can become invalid. You must first `aio logout` and then `aio login`. Also verify you are using the correct cli environment (`stage` or `prod`).

# Usage

```sh-session
$ aio plugins:install https://github.com/adobe-commerce/aio-cli-plugin-commerce
$ # OR
$ aio discover -i
$ aio commerce --help
```

# Commands
<!-- commands -->
* [`aio commerce init`](#aio-commerce-init)
* [`aio commerce dev`](#aio-pluginname)

## `aio commerce init`

```
USAGE
  $ aio commerce init [-r <value>] [--skipMesh]

FLAGS
  -r, --repo=<value>  your github repo, ie "my-test-storefront"
  --skipMesh          skip creating API Mesh

DESCRIPTION
  Scaffold your own Adobe Commerce on EDS storefront

EXAMPLES
  $ aio commerce:init --repo my-storefront
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
AIO_LOG_LEVEL=debug aio commerce:init
```

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
