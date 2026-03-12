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
import { promptSelect, promptInput } from '../../../utils/prompt.js'
import Logger from '@adobe/aio-lib-core-logging'
import STARTER_KITS from '../../../configs/starterKits.json' with { type: 'json' }
import agentsConfig from '../../../configs/agents.json' with { type: 'json' }
import { verifyLoggedIn } from '../../../utils/extensibility/app-setup/loginCheck.js'
import { ensureConsoleConfig } from '../../../utils/extensibility/app-setup/consoleSetup.js'
import { ensureWorkspaceCredentials } from '../../../utils/extensibility/app-setup/ensureWorkspaceCredentials.js'
import { cloneAndInstall } from '../../../utils/extensibility/app-setup/cloneAndInstall.js'
import { runIntegrationSetup } from '../../../utils/extensibility/app-setup/integrationSetup.js'
import { runCheckoutSetup } from '../../../utils/extensibility/app-setup/checkoutSetup.js'
import { runToolsSetup } from '../../../utils/extensibility/app-setup/runToolsSetup.js'

const aioLogger = Logger('commerce:app-setup.js')
const VALID_AGENTS = [...Object.keys(agentsConfig), 'Other']
const VALID_STARTER_KIT_FOLDERS = STARTER_KITS.map(kit => kit.folder)
const VALID_PACKAGE_MANAGERS = ['npm', 'yarn']

export class AppSetupCommand extends Command {
  async run () {
    const { flags } = await this.parse(AppSetupCommand)
    let currentStep = 'initialization'

    try {
      console.log('\n🚀 Adobe Commerce Extensibility App Setup\n')

      currentStep = 'login check'
      await verifyLoggedIn()

      const parentDir = process.cwd()
      console.log(`📁 Working directory: ${parentDir}\n`)

      let selectedStarterKit
      if (flags['starter-kit']) {
        selectedStarterKit = STARTER_KITS.find(kit => kit.folder === flags['starter-kit'])
        if (!selectedStarterKit) {
          throw new Error(
            `Invalid --starter-kit "${flags['starter-kit']}". Allowed: ${VALID_STARTER_KIT_FOLDERS.join(', ')}`
          )
        }
        console.log(`Using starter kit: ${selectedStarterKit.name}`)
      } else {
        currentStep = 'starter kit selection'
        const kitNames = STARTER_KITS.map(kit => kit.name)
        const selectedName = await promptSelect('Which starter kit would you like to use?', kitNames)
        selectedStarterKit = STARTER_KITS.find(kit => kit.name === selectedName)
      }

      let projectName
      if (flags['project-name']) {
        projectName = String(flags['project-name']).trim()
        console.log(`Using project name: ${projectName}`)
      } else {
        currentStep = 'project name'
        projectName = await promptInput('Enter a name for your project directory:')
        if (!projectName.trim()) {
          throw new Error('Project name cannot be empty.')
        }
        projectName = projectName.trim()
      }

      let selectedAgent
      if (flags.agent) {
        if (!VALID_AGENTS.includes(flags.agent)) {
          throw new Error(`Invalid --agent "${flags.agent}". Allowed: ${VALID_AGENTS.join(', ')}`)
        }
        selectedAgent = flags.agent
        console.log(`Using agent: ${selectedAgent}`)
      } else {
        currentStep = 'agent selection'
        selectedAgent = await promptSelect(
          'Which coding agent would you like to install the skills for?',
          VALID_AGENTS
        )
      }

      currentStep = 'clone and install'
      const { projectDir, packageManager } = await cloneAndInstall(
        selectedStarterKit,
        projectName,
        parentDir,
        flags['package-manager'] || null
      )

      const isIntegrationOrCheckout =
        selectedStarterKit.folder === 'integration-starter-kit' ||
        selectedStarterKit.folder === 'checkout-starter-kit'

      if (isIntegrationOrCheckout) {
        currentStep = 'console setup'
        await ensureConsoleConfig()

        currentStep = 'workspace credentials'
        await ensureWorkspaceCredentials()

        currentStep = 'kit-specific setup'
        if (selectedStarterKit.folder === 'integration-starter-kit') {
          await runIntegrationSetup(projectDir)
        } else {
          await runCheckoutSetup(projectDir)
        }
      }

      currentStep = 'tools setup'
      await runToolsSetup({
        projectDir,
        starterKitFolder: selectedStarterKit.folder,
        packageManager,
        agent: selectedAgent,
        toolsVersion: flags['tools-version'] || 'latest',
        force: flags.force || false
      })

      console.log('\n🎉 App setup complete!')
      console.log(`\n📁 Project directory: ${projectDir}`)
      console.log('\nNext steps:')
      console.log('  1. cd into your project directory')
      console.log('  2. Restart your coding agent to load the Commerce Extensibility tools and skills\n')
    } catch (error) {
      if (error.name === 'ExitPromptError') {
        console.log(`\n⚠️  Setup cancelled by user during ${currentStep}.\n`)
        return
      }
      aioLogger.error(error)
      console.error(`\n❌ Setup failed during ${currentStep}: ${error.message}\n`)
      this.error('App setup failed. Check the error above and try again.')
    }
  }
}

AppSetupCommand.flags = {
  'starter-kit': Flags.string({
    char: 's',
    description: 'Starter kit folder (e.g. integration-starter-kit, checkout-starter-kit, aem-boilerplate-commerce)',
    required: false
  }),
  'project-name': Flags.string({
    char: 'n',
    description: 'Name for the project directory',
    required: false
  }),
  agent: Flags.string({
    char: 'a',
    description: 'Coding agent: Cursor, "Claude Code", "GitHub Copilot", Windsurf, "Gemini CLI", "OpenAI Codex", Cline, "Kilo Code", Antigravity, Other',
    required: false
  }),
  'package-manager': Flags.string({
    char: 'p',
    description: 'Package manager: npm or yarn',
    required: false,
    options: VALID_PACKAGE_MANAGERS
  }),
  'tools-version': Flags.string({
    char: 'v',
    description: 'Version of commerce-extensibility-tools to install (default: latest)',
    required: false
  }),
  force: Flags.boolean({
    char: 'f',
    description: 'Force overwrite of existing MCP configuration in tools-setup',
    default: false
  })
}

AppSetupCommand.description =
  'Setup your Commerce Extensibility app: clone starter kit, configure aio console, install dependencies, and run tools-setup'
AppSetupCommand.examples = [
  '$ aio commerce extensibility app-setup',
  '$ aio commerce extensibility app-setup --starter-kit integration-starter-kit --project-name my-app --agent Cursor',
  '$ aio commerce extensibility app-setup -s checkout-starter-kit -n checkout-app -a Cursor -p npm',
  '$ aio commerce extensibility app-setup -s aem-boilerplate-commerce -n storefront -a Cursor'
]
