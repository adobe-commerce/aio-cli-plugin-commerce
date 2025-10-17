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
import { Command } from '@oclif/core'
import {
  promptInput,
  promptSelect
} from '../../../utils/prompt.js'
import { runCommand } from '../../../utils/runCommand.js'
import fs from 'fs'
import path from 'path'
import Logger from '@adobe/aio-lib-core-logging'

import { CursorAgent } from '../../../utils/extensibility/tools-setup/agents/CursorAgent.js'
import { CopilotAgent } from '../../../utils/extensibility/tools-setup/agents/CopilotAgent.js'
import { GeminiCLIAgent } from '../../../utils/extensibility/tools-setup/agents/GeminiCLIAgent.js'
import { ClaudeCodeAgent } from '../../../utils/extensibility/tools-setup/agents/ClaudeCodeAgent.js'

const aioLogger = Logger('commerce:tools-setup.js')
export class ToolsSetupCommand extends Command {
  async run () {
    try {
      console.log('🔧 Setting up Commerce Extensibility Tools...\n')

      // Ask if they want to setup in current directory or new directory
      const setupLocation = await promptSelect(
        'Where would you like to setup the tools?',
        ['Current directory', 'New directory']
      )

      let targetDir = process.cwd()

      if (setupLocation === 'New directory') {
        const newPath = await promptInput(
          'Enter the path for the new directory:'
        )
        targetDir = path.resolve(newPath)

        // Create directory if it doesn't exist
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true })
          console.log(`✅ Created directory: ${targetDir}`)
        }
      }

      // Change to target directory
      process.chdir(targetDir)
      console.log(`📁 Working in directory: ${targetDir}`)

      const selectedAgent = await promptSelect('Which coding agent would you like to use?', ['Cursor', 'Copilot', 'Gemini CLI', 'Claude Code'])
      let codingAgent = null

      if (selectedAgent === 'Copilot') {
        codingAgent = new CopilotAgent(targetDir)
      } else if (selectedAgent === 'Gemini CLI') {
        codingAgent = new GeminiCLIAgent(targetDir)
      } else if (selectedAgent === 'Claude Code') {
        codingAgent = new ClaudeCodeAgent(targetDir)
      } else {
        codingAgent = new CursorAgent(targetDir)
      }

      // Ask user for package manager preference
      const packageManager = await promptSelect(
        'Which package manager would you like to use?',
        ['npm', 'yarn']
      )

      // Check if @adobe/aio-cli-plugin-app-dev is installed, if not, install it using aio plugins:install @adobe/aio-cli-plugin-app-dev
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
        `📦 Installing @adobe-commerce/commerce-extensibility-tools package using ${packageManager}...`
      )
      const installCommand = packageManager === 'yarn'
        ? 'yarn add -D @adobe-commerce/commerce-extensibility-tools@latest'
        : 'npm install --save-dev @adobe-commerce/commerce-extensibility-tools@latest'

      try {
        await runCommand(installCommand)
        console.log('✅ Package installed successfully')
      } catch (error) {
        console.error('❌ Package installation failed:', error.message)
        throw new Error('Package installation failed. Please try again. Error: ' + error.message)
      }

      await codingAgent.setup()
    } catch (error) {
      aioLogger.error(error)
      console.error('❌ Setup failed:', error.message)
      throw new Error('Tools setup failed. Please try again.')
    }
  }
}

ToolsSetupCommand.description =
  'Setup Commerce Extensibility Tools for Cursor IDE'
ToolsSetupCommand.examples = ['$ aio commerce:extensibility:tools-setup']
