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
import { checkAndRetryMeshUpdate } from '../../utils/mesh.js'

const MESH_RETRIES = 3
const MESH_RETRY_INTERVAL = 60000

export class MeshVerify extends Command {
  async run () {
    const runAIOCommand = async (command, args) => {
      return await this.config.runCommand(command, args)
    }
    await checkAndRetryMeshUpdate(runAIOCommand, MESH_RETRIES, MESH_RETRY_INTERVAL)
  }
}

MeshVerify.description = 'Verifies that the Mesh is deployed and attempts to recreate it if deployment fails.'
