# Changelog

All notable changes to `@adobe/aio-cli-plugin-commerce` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.0] - 2026-04-14

### Added

- New `--instance` (`-i`) flag for `app-setup` to provide a Commerce GraphQL endpoint URL directly, skipping interactive instance selection
- New `--instance-name` (`-I`) flag for `app-setup` to select a Commerce instance by name from the available instances (case-insensitive match); falls back to interactive selection with the available list if no match is found
- The two flags are mutually exclusive — providing both results in an error

### Changed

- Refactored `accs.js` to extract shared `fetchTenants()` and `saveAdminUrl()` helpers, reused by both `getAndSelectInstances()` and the new `findInstanceByName()`
- Updated `runIntegrationSetup()` and `runCheckoutSetup()` to accept and forward instance options, so `--instance` and `--instance-name` flags work for all three starter kits (integration, checkout, and boilerplate)

## [0.8.0] - 2026-03-16

### Added

- ACCS Commerce instance selection during AEM Boilerplate Commerce setup in `app-setup`, writing the selected endpoint into the project's `config.json`
- `ensureConsoleOrg()` in `consoleSetup` for org-only selection (AEM Boilerplate does not need project/workspace)

### Changed

- Restructured `app-setup` to collect all interactive prompts (org, ACCS instance) before cloning and installing, so users answer all questions upfront

## [0.7.2] - 2026-03-17

### Fixed

- Fixed `app-setup` login check failing with "not logged in" error instead of opening the browser login page when the IMS CLI context was not fully configured (missing `cli.bare-output` property required by the IMS OAuth CLI plugin)

## [0.7.1] - 2026-03-16

### Fixed

- Fixed `escapeShellArg` in `runToolsSetup` to use platform-appropriate quote escaping (`""` for Windows cmd.exe, `\"` for POSIX shells)
- Fixed `readEnvFile` and `updateEnvValues` to handle Windows `\r\n` line endings, preventing corrupted values and mixed line endings in `.env` files

## [0.7.0] - 2026-03-09

### Added

- New `aio commerce extensibility app-setup` command that automates the full project setup workflow:
  - Clone a starter kit (Integration, Checkout, or AEM Boilerplate Commerce)
  - Install dependencies with detected or user-selected package manager
  - Configure Adobe I/O Console org, project, and workspace
  - Create OAuth server-to-server credentials and subscribe to required services
  - Generate `.env` from template with Commerce instance, workspace IDs, and OAuth credentials
  - Download and link workspace configuration
  - Run `tools-setup` to install Commerce Extensibility tools and agent skills
- Workspace credentials setup (`ensureWorkspaceCredentials`) creates OAuth S2S credentials and subscribes to required services (ACCS REST API, I/O Management API, I/O Events, Adobe I/O Events for Adobe Commerce)
- Added `ora` loading spinners to all long-running operations in `app-setup` (clone, install, API calls, service subscriptions, workspace download, tools setup) so users have visual feedback during waits
- Added shared `src/utils/spinner.js` utility wrapping `ora` with consistent indentation
- Added Storefront Skills starter kit option to `tools-setup` ([#38](../../pull/38))
- Added Agent Skills support with multi-agent and multi-starter-kit configuration ([#36](../../pull/36))

### Changed

- Deprecated `commerce init` command in favor of `app-setup` ([#37](../../pull/37))
- Removed hardcoded `DEFAULT_TENANTS` from Commerce instance selection — only instances from the Tenant API are shown; manual URL entry is the fallback when the API is unavailable
- Simplified AEM Boilerplate Commerce setup — removed mcp-server env file handling; only clone and dependency install are needed
- Cleaned up all `app-setup` console output for consistency:
  - Each step now has a clear header, indented sub-steps, and a completion message
  - Surfaced missing-org-services warning to the user (was previously only logged via `aioLogger.warn`)
  - Surfaced missing OAuth credential warning to the user (was previously silent `aioLogger.debug`)
  - Improved error messages to include which step failed
  - Used `this.error()` instead of `throw new Error()` in the catch block to avoid oclif printing a redundant stack trace

### Fixed

- Fixed console config not reloading after interactive org/project/workspace reselection in `app-setup`, which caused `ensureWorkspaceCredentials` to fail with "Console org, project, and workspace must be selected"
- Added validation in `consoleSetup` after config reload to fail fast with a clear error if selection did not persist

## [0.5.0-beta.1] - 2026-02-19

### Added

- Skills and Rules modes for `tools-setup` command with agent-specific configurations
- Enhanced `tools-setup` with `--tools-version` flag to pin the version of `commerce-extensibility-tools` ([#35](../../pull/35))
- Extensibility tooling support for Gemini CLI, GitHub Copilot, and Claude Code ([#34](../../pull/34))
- Graceful exit handling for `tools-setup` prompts

### Changed

- Refactored `tools-setup` command to support Skills and Rules modes with Babel parser and agent configurations
- Updated README to reflect Skills and Rules mode changes

### Fixed

- Handle missing Dev Plugin gracefully ([#33](../../pull/33))

## [0.3.0-alpha.1] - 2025-12-12

### Added

- Initial `aio commerce extensibility tools-setup` command for installing Commerce Extensibility MCP tools ([#31](../../pull/31))
- Adobe Commerce Docs Chat application (experimental)

### Changed

- Security warning about public access added to site generation output
- Skip cloning overlay paths during content setup

## [0.2.0] - 2025-05-29

### Added

- Copy from published source and initialize DA library config ([#26](../../pull/26))
- HLX5 template support ([#24](../../pull/24))

### Changed

- Increased code sync timeout and cleaned up TODOs ([#29](../../pull/29))
- Linked to content config for older ACCS/ACO templates ([#30](../../pull/30))

### Fixed

- Throw on `runCommand` error and double-check repo exists after `gh repo create` ([#27](../../pull/27))
- Prevent repo names with underscores or excessively long names
- Fixed images for HLX5 sites

## [0.1.3] - 2025-04-23

### Fixed

- Fixed images for HLX5 sites

## [0.1.2] - 2025-04-23

### Changed

- Skip copying `full-index` during content setup

## [0.1.1] - 2025-04-22

### Changed

- Improved code sync prompt with URL reference

## [0.1.0] - 2025-04-22

### Added

- HLX5 template support ([#24](../../pull/24))

## [0.0.1] - 2025-04-21

### Added

- Initial release of `@adobe/aio-cli-plugin-commerce`
- `aio commerce init` command to scaffold an AEM + Commerce storefront:
  - Clone template repository and upload content to Document Authoring
  - Configure API Mesh with Commerce backend (PAAS or SAAS)
  - Bulk preview and publish content
  - Auto-select org based on GitHub auth
- `aio commerce dev` command to scaffold local repo, install dependencies, and run dev server
- Commerce tenant selection via CCM Tenant API with fuzzy search
- API Mesh provisioning with create-or-update logic
- Support for multiple templates (Adobe Demo Store, CitiSignal)
- Flags for non-interactive setup (`--skipGit`, `--datasource`, `--org`, `--repo`, etc.)

[Unreleased]: https://github.com/adobe-commerce/aio-cli-plugin-commerce/compare/0.9.0...HEAD
[0.9.0]: https://github.com/adobe-commerce/aio-cli-plugin-commerce/compare/0.8.0...0.9.0
[0.8.0]: https://github.com/adobe-commerce/aio-cli-plugin-commerce/compare/0.7.2...0.8.0
[0.7.2]: https://github.com/adobe-commerce/aio-cli-plugin-commerce/compare/0.7.1...0.7.2
[0.7.1]: https://github.com/adobe-commerce/aio-cli-plugin-commerce/compare/0.7.0...0.7.1
[0.7.0]: https://github.com/adobe-commerce/aio-cli-plugin-commerce/compare/v0.5.0-beta.1...0.7.0
[0.5.0-beta.1]: https://github.com/adobe-commerce/aio-cli-plugin-commerce/compare/0.3.0-alpha.1...v0.5.0-beta.1
[0.3.0-alpha.1]: https://github.com/adobe-commerce/aio-cli-plugin-commerce/compare/0.2.0...0.3.0-alpha.1
[0.2.0]: https://github.com/adobe-commerce/aio-cli-plugin-commerce/compare/0.1.3...0.2.0
[0.1.3]: https://github.com/adobe-commerce/aio-cli-plugin-commerce/compare/0.1.2...0.1.3
[0.1.2]: https://github.com/adobe-commerce/aio-cli-plugin-commerce/compare/0.1.1...0.1.2
[0.1.1]: https://github.com/adobe-commerce/aio-cli-plugin-commerce/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/adobe-commerce/aio-cli-plugin-commerce/compare/0.0.1...0.1.0
[0.0.1]: https://github.com/adobe-commerce/aio-cli-plugin-commerce/releases/tag/0.0.1
