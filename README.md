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

❗ The Github account used by the CLI must have permission to create repositories and install Github Applications on that repository.

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
- are able to obtain the full error output using AIO_LOG_LEVEL=debug aio commerce init.
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
  $ aio commerce init [-d <value>] [-r <value>] [--skipMesh] [-t <value>]

FLAGS
  -d, --datasource=<value>  your datasource, ie "https://my-commerce-api.com/graphql
  -r, --repo=<value>        your github repo, ie "my-git-user/my-test-storefront"
  --skipMesh                skip creating API Mesh
  -t, --template=<value>    the template to use, ie "adobe-commerce/adobe-demo-store

DESCRIPTION
  Scaffold your own Adobe Commerce on EDS storefront

EXAMPLES
  $  aio commerce:init
  $  aio commerce:init --template "adobe-commerce/adobe-demo-store" --skipMesh --repo "my-git-user/my-site"

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
AIO_LOG_LEVEL=debug aio commerce:init
```

## Contributing

Contributions are welcomed! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
