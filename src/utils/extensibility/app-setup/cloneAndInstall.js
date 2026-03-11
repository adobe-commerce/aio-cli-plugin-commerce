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
import fs from 'fs'
import path from 'path'
import { runCommand } from '../../runCommand.js'
import { detectPackageManager } from '../../packageManager.js'
import { promptSelect } from '../../prompt.js'
import { createSpinner } from '../../spinner.js'
import Logger from '@adobe/aio-lib-core-logging'

const aioLogger = Logger('commerce:app-setup:cloneAndInstall.js')
const VALID_PACKAGE_MANAGERS = ['npm', 'yarn']
/** Project name must be safe for use in shell and filesystem (alphanumeric, hyphen, underscore) */
const PROJECT_NAME_PATTERN = /^[a-zA-Z0-9_-]+$/

/**
 * Clones a starter kit and installs dependencies.
 *
 * @param {object} starterKit - { name, folder, repo, branch } from starterKits.json
 * @param {string} projectName - Name for the project directory
 * @param {string} parentDir - Directory to clone into (default: process.cwd())
 * @param {string} [packageManagerOverride] - Optional: 'npm' or 'yarn' to skip detection/prompt
 * @returns {Promise<{ projectDir: string, packageManager: string }>}
 */
export async function cloneAndInstall (starterKit, projectName, parentDir = process.cwd(), packageManagerOverride = null) {
  const { repo, branch } = starterKit

  if (!repo || !branch) {
    throw new Error(
      `Starter kit "${starterKit.name}" is missing repo or branch in config. ` +
      'Ensure starterKits.json has repo and branch for all kits.'
    )
  }

  const trimmed = String(projectName).trim()
  if (!trimmed) {
    throw new Error('Project name cannot be empty.')
  }
  if (!PROJECT_NAME_PATTERN.test(trimmed)) {
    throw new Error(
      'Project name may only contain letters, numbers, hyphens, and underscores (e.g. my-commerce-app).'
    )
  }

  const projectDir = path.join(parentDir, trimmed)

  if (fs.existsSync(projectDir)) {
    throw new Error(
      `Directory "${trimmed}" already exists at ${parentDir}. ` +
      'Choose a different project name or remove the existing directory.'
    )
  }

  console.log(`\n📦 Cloning ${starterKit.name}...`)

  let spinner = createSpinner('Cloning repository...').start()
  const cloneCommand = `git clone --branch ${branch} ${repo} ${trimmed}`
  await runCommand(cloneCommand, { cwd: parentDir })
  spinner.succeed('Repository cloned')

  let packageManager = packageManagerOverride
  if (!packageManager) {
    const detected = detectPackageManager(projectDir)
    if (detected.manager) {
      packageManager = detected.manager
      console.log(`   Using ${packageManager} (${detected.reason})`)
    } else {
      packageManager = await promptSelect(
        'Which package manager would you like to use?',
        VALID_PACKAGE_MANAGERS
      )
    }
  }

  spinner = createSpinner(`Installing dependencies with ${packageManager}...`).start()
  const installCommand = packageManager === 'yarn' ? 'yarn install' : 'npm install'
  await runCommand(installCommand, { cwd: projectDir })
  spinner.succeed('Dependencies installed')

  aioLogger.debug('Clone and install complete', { projectDir, packageManager })
  return { projectDir, packageManager }
}
