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
import config from '@adobe/aio-lib-core-config'
import { promptConfirm } from '../../prompt.js'
import { runInteractiveCommand } from '../../runCommand.js'
import Logger from '@adobe/aio-lib-core-logging'

const aioLogger = Logger('commerce:app-setup:consoleSetup.js')

/**
 * Ensures an org is selected in the aio console config.
 * If already set, displays it and asks if the user wants to continue or reselect.
 * Only prompts for org — does not touch project or workspace.
 *
 * @returns {Promise<void>}
 */
export async function ensureConsoleOrg () {
  const org = config.get('console.org')

  if (org) {
    const orgId = org.id ?? org.code

    console.log('\n📋 Current Adobe I/O Console organization:')
    console.log(`   Org: ${org.name ?? 'Unknown'} (${orgId ?? 'Unknown'})`)

    const continueWithCurrent = await promptConfirm(
      'Do you want to continue with this organization? (Answer "No" to select a different org)'
    )

    if (continueWithCurrent) {
      aioLogger.debug('User chose to continue with existing console org')
      return
    }

    aioLogger.debug('User chose to reselect org')
    config.delete('console.org')
  }

  console.log('\n🔧 Selecting Adobe I/O Console organization...\n')

  await runInteractiveCommand('aio console org select')

  config.reload()

  const selectedOrg = config.get('console.org')
  if (!selectedOrg) {
    throw new Error(
      'Console org must be selected. Run `aio console org select` first.'
    )
  }

  console.log('\n✅ Organization configured:')
  console.log(`   Org: ${selectedOrg.name ?? 'Unknown'}`)
}

/**
 * Ensures org, project, and workspace are selected in the aio console config.
 * If already set, displays them and asks if the user wants to continue or reselect.
 * If user reselects, clears config and runs interactive aio console selection commands.
 *
 * @returns {Promise<void>}
 */
export async function ensureConsoleConfig () {
  const org = config.get('console.org')
  const project = config.get('console.project')
  const workspace = config.get('console.workspace')

  if (org && project && workspace) {
    const orgId = org.id ?? org.code
    const projectId = project.id ?? project.code
    const workspaceId = workspace.id ?? workspace.code

    console.log('\n📋 Current Adobe I/O Console configuration:')
    console.log(`   Org: ${org.name ?? 'Unknown'} (${orgId ?? 'Unknown'})`)
    console.log(`   Project: ${project.name ?? 'Unknown'} (${projectId ?? 'Unknown'})`)
    console.log(`   Workspace: ${workspace.name ?? 'Unknown'} (${workspaceId ?? 'Unknown'})`)

    const continueWithCurrent = await promptConfirm(
      'Do you want to continue with this configuration? (Answer "No" to select a different org/project/workspace)'
    )

    if (continueWithCurrent) {
      aioLogger.debug('User chose to continue with existing console config')
      return
    }

    aioLogger.debug('User chose to reselect org/project/workspace')
    config.delete('console.org')
    config.delete('console.project')
    config.delete('console.workspace')
  }

  console.log('\n🔧 Selecting Adobe I/O Console org, project, and workspace...\n')

  await runInteractiveCommand('aio console org select')

  try {
    await runInteractiveCommand('aio console project select')
  } catch (error) {
    if (error.stderr && /terms/i.test(error.stderr)) {
      throw new Error(
        'The selected organization has not accepted the Adobe Developer Terms of Use.\n' +
        'An org admin must accept the terms at https://developer.adobe.com/console/ before projects can be accessed.\n' +
        'After accepting, run this command again.'
      )
    }
    throw error
  }

  await runInteractiveCommand('aio console workspace select')

  config.reload()

  const selectedOrg = config.get('console.org')
  const selectedProject = config.get('console.project')
  const selectedWorkspace = config.get('console.workspace')

  if (!selectedOrg || !selectedProject || !selectedWorkspace) {
    throw new Error(
      'Console org, project, and workspace must be selected. Run aio console org/project/workspace select first.'
    )
  }

  console.log('\n✅ Console configured:')
  console.log(`   Org: ${selectedOrg.name ?? 'Unknown'}`)
  console.log(`   Project: ${selectedProject.name ?? 'Unknown'}`)
  console.log(`   Workspace: ${selectedWorkspace.name ?? 'Unknown'}`)
}
