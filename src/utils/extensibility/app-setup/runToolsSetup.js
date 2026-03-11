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
import { createSpinner } from '../../spinner.js'
import Logger from '@adobe/aio-lib-core-logging'

const aioLogger = Logger('commerce:app-setup:runToolsSetup.js')

/**
 * Escapes a value for safe use in a shell command (quotes values containing spaces/special chars).
 *
 * @param {string} val - Value to escape
 * @returns {string}
 */
function escapeShellArg (val) {
  const s = String(val)
  if (/^[a-zA-Z0-9_-]+$/.test(s)) {
    return s
  }
  return `"${s.replace(/"/g, '\\"')}"`
}

/**
 * Runs `aio commerce extensibility tools-setup` with known arguments from the project directory.
 *
 * @param {object} options
 * @param {string} options.projectDir - Project directory (cwd for the command)
 * @param {string} options.starterKitFolder - Starter kit folder name (e.g. integration-starter-kit)
 * @param {string} options.packageManager - 'npm' or 'yarn'
 * @param {string} options.agent - Agent name (e.g. Cursor, Claude Code)
 * @param {string} [options.toolsVersion='latest'] - Tools version to install
 * @param {boolean} [options.force=false] - Force overwrite MCP config
 */
export async function runToolsSetup ({
  projectDir,
  starterKitFolder,
  packageManager,
  agent,
  toolsVersion = 'latest',
  force = false
}) {
  if (!projectDir || !starterKitFolder || !packageManager || !agent) {
    throw new Error(
      'runToolsSetup requires projectDir, starterKitFolder, packageManager, and agent.'
    )
  }

  const args = [
    'aio commerce extensibility tools-setup',
    `--starter-kit ${escapeShellArg(starterKitFolder)}`,
    `--package-manager ${escapeShellArg(packageManager)}`,
    `--agent ${escapeShellArg(agent)}`
  ]
  if (toolsVersion) {
    args.push(`--tools-version ${escapeShellArg(toolsVersion)}`)
  }
  if (force) {
    args.push('--force')
  }
  const command = args.join(' ')

  console.log('\n🔧 Installing Commerce Extensibility tools and agent skills...')
  aioLogger.debug('Running tools-setup:', command, 'cwd:', projectDir)

  const spinner = createSpinner('Running tools-setup...').start()
  await runCommand(command, { cwd: projectDir })
  spinner.succeed('Commerce Extensibility tools installed')
}
