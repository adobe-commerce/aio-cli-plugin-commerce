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

import { checkAndRetryMeshUpdate } from '../../utils/mesh.js'
import { runCommand } from '../../utils/runCommand.js'

const MESH_RETRIES = 2
const MESH_RETRY_INTERVAL = 90000 // 1.5 minutes

export class MeshVerify extends Command {
  async run () {
    const { flags } = await this.parse(MeshVerify)
    const runAIOCommand = async (command, args) => {
      return await this.config.runCommand(command, args)
    }

    try {
      const { orgId, projectId, workspaceId } = flags

      console.log(`Setting orgId: ${orgId}`)
      await runCommand(`aio console org select ${orgId}`)

      console.log(`Setting projectId: ${projectId}`)
      await runCommand(`aio console project select ${projectId}`)

      console.log(`Setting workspaceId: ${workspaceId}`)
      await runCommand(`aio console workspace select ${workspaceId}`)
    } catch (e) {
      // If the user does not provide the required arguments, we will not attempt to select them and depend on preselected options from aio config.
    }

    await checkAndRetryMeshUpdate(
      runAIOCommand,
      MESH_RETRIES,
      MESH_RETRY_INTERVAL
    )
  }
}

MeshVerify.flags = {
  orgId: Flags.string({
    name: 'orgId',
    char: 'o',
    required: false,
    description: 'Organization ID'
  }),
  projectId: Flags.string({
    name: 'projectId',
    required: false,
    description: 'Project ID'
  }),
  workspaceId: Flags.string({
    name: 'workspaceId',
    required: false,
    description: 'Workspace ID'
  })
}

MeshVerify.description =
    'Verifies that the Mesh is deployed and attempts to recreate it if deployment fails.'
