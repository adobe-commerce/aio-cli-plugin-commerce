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
import Logger from '@adobe/aio-lib-core-logging'

const aioLogger = Logger('commerce:app-setup:workspaceConfig.js')

/**
 * Downloads workspace.json from Adobe I/O Console into the project directory.
 *
 * @param {string} projectDir - Project root directory
 * @returns {Promise<string>} Path to the downloaded workspace.json
 */
export async function downloadWorkspaceConfig (projectDir) {
  const workspacePath = path.join(projectDir, 'workspace.json')
  await runCommand('aio console workspace download workspace.json', { cwd: projectDir })

  if (!fs.existsSync(workspacePath)) {
    throw new Error('workspace.json was not downloaded. Ensure you have selected a workspace in aio console.')
  }

  aioLogger.debug('Downloaded workspace.json to', workspacePath)
  return workspacePath
}
