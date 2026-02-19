/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { Command, Flags } from '@oclif/core'
import {
  promptSelect
} from '../../../utils/prompt.js'
import { runCommand } from '../../../utils/runCommand.js'
import Logger from '@adobe/aio-lib-core-logging'
import { installSkills } from '../../../utils/extensibility/tools-setup/installSkills.js'
import { installMCP } from '../../../utils/extensibility/tools-setup/installMCP.js'

// Config imports
import agentsConfig from '../../../configs/agents.json' with { type: 'json' }
import STARTER_KITS from '../../../configs/starterKits.json' with { type: 'json' }

const aioLogger = Logger('commerce:tools-setup.js')

/** Valid agent names (derived from agents.json + 'Other') */
const VALID_AGENTS = [...Object.keys(agentsConfig), 'Other']

/** Valid starter kit folder names */
const VALID_STARTER_KITS = STARTER_KITS.map(kit => kit.folder)

/** Valid package managers */
const VALID_PACKAGE_MANAGERS = ['npm', 'yarn']

/**
 * Validates the version string format.
 * Accepts semver versions (1.2.3, 1.2.3-beta.1), npm tags (latest, next, beta),
 * and version ranges (^1.2.3, ~1.2.3, >=1.0.0).
 * @param {string} version - The version string to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidVersionFormat (version) {
  const distTagPattern = /^[a-zA-Z][a-zA-Z0-9-]*$/
  const semverPattern = /^[~^]?[><=]*\d+(\.\d+)?(\.\d+)?(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/

  return distTagPattern.test(version) || semverPattern.test(version)
}

/**
 * Validates a flag value against a list of allowed values.
 * Throws with a descriptive error if the value is invalid.
 *
 * @param {string} flagName - The flag name for error messages
 * @param {string} value - The provided flag value
 * @param {string[]} allowed - The list of allowed values
 */
function validateFlagValue (flagName, value, allowed) {
  if (!allowed.includes(value)) {
    throw new Error(
      `Invalid value "${value}" for --${flagName}. Allowed values: ${allowed.join(', ')}`
    )
  }
}

export class ToolsSetupCommand extends Command {
  async run () {
    const { flags } = await this.parse(ToolsSetupCommand)
    const toolsVersion = flags['tools-version'] || 'latest'
    const force = flags.force || false

    // Validate version format before proceeding
    if (!isValidVersionFormat(toolsVersion)) {
      console.error(`❌ Invalid version format: "${toolsVersion}"`)
      console.error('   Version must be a valid semver (e.g., 1.2.3, ^1.2.3) or npm tag (e.g., latest, next)')
      throw new Error(`Invalid version format: "${toolsVersion}"`)
    }

    // Validate flag values upfront if provided
    if (flags['starter-kit']) {
      validateFlagValue('starter-kit', flags['starter-kit'], VALID_STARTER_KITS)
    }
    if (flags['package-manager']) {
      validateFlagValue('package-manager', flags['package-manager'], VALID_PACKAGE_MANAGERS)
    }
    if (flags.agent) {
      validateFlagValue('agent', flags.agent, VALID_AGENTS)
    }

    let currentStep = 'initialization'
    try {
      console.log('🔧 Setting up Commerce Extensibility Tools...\n')

      const targetDir = process.cwd()
      console.log(`📁 Working in directory: ${targetDir}`)

      // Determine starter kit: use flag or prompt
      let selectedStarterKit
      if (flags['starter-kit']) {
        selectedStarterKit = STARTER_KITS.find(kit => kit.folder === flags['starter-kit'])
        console.log(`📋 Starter kit: ${selectedStarterKit.name}`)
      } else {
        currentStep = 'starter kit selection'
        const starterKitNames = STARTER_KITS.map(kit => kit.name)
        const selectedKitName = await promptSelect(
          'Which starter kit would you like to use?',
          starterKitNames
        )
        selectedStarterKit = STARTER_KITS.find(kit => kit.name === selectedKitName)
      }

      // Determine agent: use flag or prompt
      let selectedAgent
      if (flags.agent) {
        selectedAgent = flags.agent
        console.log(`📋 Agent: ${selectedAgent}`)
      } else {
        currentStep = 'agent selection'
        const agentChoices = [...Object.keys(agentsConfig), 'Other']
        selectedAgent = await promptSelect(
          'Which coding agent would you like to install the skills for?',
          agentChoices
        )
      }

      // Determine package manager: use flag or prompt
      let packageManager
      if (flags['package-manager']) {
        packageManager = flags['package-manager']
        console.log(`📋 Package manager: ${packageManager}`)
      } else {
        currentStep = 'package manager selection'
        packageManager = await promptSelect(
          'Which package manager would you like to use?',
          VALID_PACKAGE_MANAGERS
        )
      }

      // Check if @adobe/aio-cli-plugin-app-dev is installed, if not, install it
      try {
        await runCommand('aio plugins:inspect @adobe/aio-cli-plugin-app-dev')
        console.log('✅ @adobe/aio-cli-plugin-app-dev plugin installed')
      } catch (error) {
        console.log('⚠️  @adobe/aio-cli-plugin-app-dev plugin not installed, installing...')
        await runCommand('aio plugins:install @adobe/aio-cli-plugin-app-dev')
        console.log('✅ @adobe/aio-cli-plugin-app-dev plugin installed')
      }

      // Install the npm package
      console.log(
        `📦 Installing @adobe-commerce/commerce-extensibility-tools@${toolsVersion} using ${packageManager}...`
      )
      const installCommand = packageManager === 'yarn'
        ? `yarn add -W -D @adobe-commerce/commerce-extensibility-tools@${toolsVersion}`
        : `npm install --save-dev @adobe-commerce/commerce-extensibility-tools@${toolsVersion}`

      try {
        await runCommand(installCommand)
        console.log('✅ Package installed successfully')
      } catch (error) {
        console.error('❌ Package installation failed:', error.message)
        if (error.message.includes('404') || error.message.includes('ETARGET') || error.message.includes('No matching version')) {
          console.error(`   The specified version "${toolsVersion}" may not exist on npm.`)
          console.error('   Please verify the version exists: npm view @adobe-commerce/commerce-extensibility-tools versions')
          throw new Error(`Package installation failed. Version "${toolsVersion}" not found on npm.`)
        }
        throw new Error('Package installation failed. Please try again. Error: ' + error.message)
      }

      // Install MCP configuration and skills
      currentStep = 'MCP configuration'
      await installMCP(targetDir, selectedAgent, { force })
      currentStep = 'skills installation'
      await installSkills(targetDir, selectedStarterKit.folder, selectedAgent)

      console.log('\n🎉 Commerce Extensibility Tools setup complete!')
      console.log(`📁 Configuration location: ${targetDir}`)
      console.log('📋 AGENTS.md: project root')
      if (selectedAgent !== 'Other') {
        const agentCfg = agentsConfig[selectedAgent]
        console.log(`📋 Skills location: ${agentCfg.skillsPath}/`)
      } else {
        console.log('📋 Skills location: ./skills/')
      }
      console.log('\nNext steps:')
      console.log('1. Restart your coding agent to load the new MCP tools and skills')
      console.log('2. The Commerce App Builder tools should now be available in your environment')
    } catch (error) {
      if (error.name === 'ExitPromptError') {
        console.log(`\n⚠️  Setup cancelled by user during ${currentStep}.`)
        return
      }
      aioLogger.error(error)
      console.error('❌ Setup failed:', error.message)
      throw new Error('Tools setup failed. Please try again.')
    }
  }
}

ToolsSetupCommand.flags = {
  'tools-version': Flags.string({
    char: 'v',
    description: 'Version of @adobe-commerce/commerce-extensibility-tools to install (defaults to latest)',
    required: false
  }),
  'starter-kit': Flags.string({
    char: 's',
    description: 'Starter kit to use. e.g. "integration-starter-kit"',
    required: false,
    options: VALID_STARTER_KITS
  }),
  agent: Flags.string({
    char: 'a',
    description: 'Coding agent to configure: Cursor, "Claude Code", "GitHub Copilot", Windsurf, "Gemini CLI", "OpenAI Codex", Cline, "Kilo Code", Antigravity, Other',
    required: false
  }),
  'package-manager': Flags.string({
    char: 'p',
    description: 'Package manager to use: "npm" or "yarn"',
    required: false,
    options: VALID_PACKAGE_MANAGERS
  }),
  force: Flags.boolean({
    char: 'f',
    description: 'Force overwrite of existing MCP configuration without prompting',
    default: false
  })
}

ToolsSetupCommand.description =
  'Setup Commerce Extensibility Tools with Agent Skills for your coding agent'
ToolsSetupCommand.examples = [
  '$ aio commerce:extensibility:tools-setup',
  '$ aio commerce:extensibility:tools-setup --tools-version 1.2.3',
  '$ aio commerce:extensibility:tools-setup --starter-kit integration-starter-kit --agent Cursor --package-manager npm',
  '$ aio commerce:extensibility:tools-setup -s integration-starter-kit -a Cursor -p npm -f'
]
