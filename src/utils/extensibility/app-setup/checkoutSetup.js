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
import { runCommand } from '../../runCommand.js'
import { downloadWorkspaceConfig } from './workspaceConfig.js'
import { createSpinner } from '../../spinner.js'
/**
 * Runs Checkout Starter Kit-specific setup steps.
 *
 * @param {string} projectDir - Project root directory@param {object}
 * @param {object} [options={}] - Setup options from CLI flags
 * @param {string} [options.instanceUrl] - Commerce GraphQL URL (--instance flag)
 * @param {string} [options.instanceName] - Commerce instance name (--instance-name flag)
 * @param {string} [options.eventPrefix] - Event prefix for workspace (--event-prefix flag)
 */
export async function runCheckoutSetup (projectDir, options = {}) {
  console.log('\n📋 Configuring Checkout Starter Kit...')

  if (options.instanceUrl || options.instanceName) {
    console.log('   ⚠ --instance or --instance-name flags are not supported for Checkout apps. Please associate the app once developed using the Commerce App Management UI.')
  }
  if (options.eventPrefix) {
    console.log('   ⚠ --event-prefix flag is not supported for Checkout apps. Check app.commerce.config.ts for event prefix configuration.')
  }

  let spinner = createSpinner('Downloading workspace configuration...').start()
  await downloadWorkspaceConfig(projectDir)
  spinner.succeed()

  spinner = createSpinner('Connecting to remote workspace...').start()
  await runCommand('aio app use workspace.json -m', { cwd: projectDir })
  spinner.succeed('Checkout Starter Kit configured')
}
