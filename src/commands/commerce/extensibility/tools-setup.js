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

// Skills flow imports
import { installSkills, AGENTS_CONFIG } from '../../../utils/extensibility/tools-setup/installSkills.js'
import { installMCP } from '../../../utils/extensibility/tools-setup/installMCP.js'

// Rules flow imports (to be deprecated)
import { CursorAgent } from '../../../utils/extensibility/tools-setup/agents/CursorAgent.js'
import { CopilotAgent } from '../../../utils/extensibility/tools-setup/agents/CopilotAgent.js'
import { GeminiCLIAgent } from '../../../utils/extensibility/tools-setup/agents/GeminiCLIAgent.js'
import { ClaudeCodeAgent } from '../../../utils/extensibility/tools-setup/agents/ClaudeCodeAgent.js'

const aioLogger = Logger('commerce:tools-setup.js')

/**
 * Starter kit configurations.
 * Each entry maps a starter kit to its display name and the folder name
 * inside the dist/ directory of the commerce-extensibility-tools package.
 */
const STARTER_KITS = [
  {
    name: 'Integration Starter Kit',
    folder: 'integration-starter-kit'
  }
  // {
  //   name: 'Checkout Starter Kit',
  //   folder: 'checkout-starter-kit'
  // }
]

/**
 * Validates the version string format.
 * Accepts semver versions (1.2.3, 1.2.3-beta.1), npm tags (latest, next, beta),
 * and version ranges (^1.2.3, ~1.2.3, >=1.0.0).
 * @param {string} version - The version string to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidVersionFormat (version) {
  // Allow npm dist-tags (latest, next, beta, alpha, canary, etc.)
  const distTagPattern = /^[a-zA-Z][a-zA-Z0-9-]*$/

  // Allow semver versions with optional pre-release and build metadata
  // Examples: 1.2.3, 1.2.3-beta.1, 1.2.3+build.123, ^1.2.3, ~1.2.3, >=1.0.0
  const semverPattern = /^[~^]?[><=]*\d+(\.\d+)?(\.\d+)?(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/

  return distTagPattern.test(version) || semverPattern.test(version)
}

export class ToolsSetupCommand extends Command {
  async run () {
    const { flags } = await this.parse(ToolsSetupCommand)
    const toolsVersion = flags['tools-version'] || 'latest'

    // Validate version format before proceeding
    if (!isValidVersionFormat(toolsVersion)) {
      console.error(`❌ Invalid version format: "${toolsVersion}"`)
      console.error('   Version must be a valid semver (e.g., 1.2.3, ^1.2.3) or npm tag (e.g., latest, next)')
      throw new Error(`Invalid version format: "${toolsVersion}"`)
    }

    try {
      console.log('🔧 Setting up Commerce Extensibility Tools...\n')

      const targetDir = process.cwd()
      console.log(`📁 Working in directory: ${targetDir}`)

      // Ask if user wants to use Skills (recommended) or Rules
      const setupMode = await promptSelect(
        'Would you like to use Skills (recommended) or Rules?',
        ['Skills (recommended)', 'Rules (legacy)']
      )

      const useSkills = setupMode === 'Skills (recommended)'

      // Variables to hold selections for each flow
      let selectedStarterKit = null
      let selectedAgent = null
      let codingAgent = null

      if (useSkills) {
        // Skills flow: ask for starter kit, then agent
        const starterKitNames = STARTER_KITS.map(kit => kit.name)
        const selectedKitName = await promptSelect(
          'Which starter kit would you like to use?',
          starterKitNames
        )
        selectedStarterKit = STARTER_KITS.find(kit => kit.name === selectedKitName)

        // Build agent choices: 9 named agents + Other
        const agentChoices = [...Object.keys(AGENTS_CONFIG), 'Other']
        selectedAgent = await promptSelect(
          'Which coding agent would you like to install the skills for?',
          agentChoices
        )
      } else {
        // Rules flow: ask for agent (existing 4 agents)
        const rulesAgent = await promptSelect(
          'Which coding agent would you like to use?',
          ['Cursor', 'Copilot', 'Gemini CLI', 'Claude Code']
        )

        if (rulesAgent === 'Copilot') {
          codingAgent = new CopilotAgent(targetDir)
        } else if (rulesAgent === 'Gemini CLI') {
          codingAgent = new GeminiCLIAgent(targetDir)
        } else if (rulesAgent === 'Claude Code') {
          codingAgent = new ClaudeCodeAgent(targetDir)
        } else {
          codingAgent = new CursorAgent(targetDir)
        }
      }

      // Ask user for package manager preference
      const packageManager = await promptSelect(
        'Which package manager would you like to use?',
        ['npm', 'yarn']
      )

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

      if (useSkills) {
        // Skills flow: install MCP, then install skills
        await installMCP(targetDir, selectedAgent)
        await installSkills(targetDir, selectedStarterKit.folder, selectedAgent)

        console.log('\n🎉 Commerce Extensibility Tools setup complete!')
        console.log(`📁 Configuration location: ${targetDir}`)
        console.log('📋 AGENTS.md: project root')
        if (selectedAgent !== 'Other') {
          const agentConfig = AGENTS_CONFIG[selectedAgent]
          console.log(`📋 Skills location: ${agentConfig.skillsPath}/`)
        } else {
          console.log('📋 Skills location: ./skills/')
        }
        console.log('\nNext steps:')
        console.log('1. Restart your coding agent to load the new MCP tools and skills')
        console.log('2. The Commerce App Builder tools should now be available in your environment')
      } else {
        // Rules flow: run existing agent setup (MCP + rules)
        await codingAgent.setup()
      }
    } catch (error) {
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
  })
}

ToolsSetupCommand.description =
  'Setup Commerce Extensibility Tools with Agent Skills or Rules for your coding agent'
ToolsSetupCommand.examples = [
  '$ aio commerce:extensibility:tools-setup',
  '$ aio commerce:extensibility:tools-setup --tools-version 1.2.3'
]
