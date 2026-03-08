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
import path from 'path'
import fs from 'fs'
import { copyEnvFile } from './envFile.js'
import Logger from '@adobe/aio-lib-core-logging'

const aioLogger = Logger('commerce:app-setup:aemBoilerplateCommerceSetup.js')

/**
 * Runs AEM Boilerplate Commerce-specific setup steps.
 * Creates .env from env.example. Checks mcp-server subfolder first, then project root.
 *
 * @param {string} projectDir - Project root directory
 */
export async function runAemBoilerplateCommerceSetup (projectDir) {
  const envExampleMcp = path.join(projectDir, 'mcp-server', 'env.example')
  const envExampleRoot = path.join(projectDir, 'env.example')

  if (fs.existsSync(envExampleMcp)) {
    const mcpEnvPath = path.join(projectDir, 'mcp-server', '.env')
    console.log('\n📋 Creating .env from env.example in mcp-server...')
    copyEnvFile(envExampleMcp, mcpEnvPath)
  } else if (fs.existsSync(envExampleRoot)) {
    const envPath = path.join(projectDir, '.env')
    console.log('\n📋 Creating .env from env.example...')
    copyEnvFile(envExampleRoot, envPath)
  } else {
    throw new Error(
      `env.example not found. Expected at ${envExampleMcp} or ${envExampleRoot}`
    )
  }

  aioLogger.debug('AEM Boilerplate Commerce setup complete')
}
