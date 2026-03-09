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
import { getCommerceGraphQLUrl } from './commerceInstance.js'
import { promptInput } from '../../prompt.js'
import { runCommand } from '../../runCommand.js'
import { copyEnvFile, updateEnvValues } from './envFile.js'
import {
  downloadWorkspaceConfig,
  copyWorkspaceConfig,
  extractOAuthCredentials,
  extractWorkspaceIds
} from './workspaceConfig.js'
import Logger from '@adobe/aio-lib-core-logging'

const aioLogger = Logger('commerce:app-setup:checkoutSetup.js')

/**
 * Runs Checkout Starter Kit-specific setup steps.
 *
 * @param {string} projectDir - Project root directory
 */
export async function runCheckoutSetup (projectDir) {
  const envDistPath = path.join(projectDir, 'env.dist')
  const envPath = path.join(projectDir, '.env')

  if (!fs.existsSync(envDistPath)) {
    throw new Error(
      `env.dist not found at ${envDistPath}. Ensure the Checkout Starter Kit was cloned correctly.`
    )
  }

  console.log('\n📋 Creating .env from env.dist...')
  copyEnvFile(envDistPath, envPath)

  console.log('\n🛒 Selecting commerce instance...')
  const graphqlUrl = await getCommerceGraphQLUrl()
  let baseUrl = graphqlUrl.replace(/\/graphql\/?$/, '')
  if (!baseUrl.endsWith('/')) {
    baseUrl += '/'
  }
  updateEnvValues(envPath, {
    COMMERCE_BASE_URL: baseUrl,
    COMMERCE_GRAPHQL_ENDPOINT: graphqlUrl
  })
  console.log('✅ Commerce instance configured')

  const eventPrefix = await promptInput('Enter the event prefix for your workspace:')
  updateEnvValues(envPath, { EVENT_PREFIX: eventPrefix.trim() })

  console.log('\n📥 Downloading workspace configuration...')
  await downloadWorkspaceConfig(projectDir)
  copyWorkspaceConfig(projectDir)

  const workspacePath = path.join(projectDir, 'workspace.json')
  const workspaceIds = extractWorkspaceIds(workspacePath)
  updateEnvValues(envPath, {
    IO_CONSUMER_ID: workspaceIds.consumerId,
    IO_PROJECT_ID: workspaceIds.projectId,
    IO_WORKSPACE_ID: workspaceIds.workspaceId
  })
  console.log('✅ Workspace IDs (IO_CONSUMER_ID, IO_PROJECT_ID, IO_WORKSPACE_ID) populated from workspace')

  const oauth = extractOAuthCredentials(workspacePath)
  if (oauth) {
    updateEnvValues(envPath, {
      OAUTH_CLIENT_ID: oauth.clientId,
      OAUTH_CLIENT_SECRET: oauth.clientSecret,
      OAUTH_TECHNICAL_ACCOUNT_ID: oauth.technicalAccountId,
      OAUTH_TECHNICAL_ACCOUNT_EMAIL: oauth.technicalAccountEmail,
      OAUTH_ORG_ID: oauth.orgId
    })
    console.log('✅ OAuth credentials populated from workspace')
  } else {
    aioLogger.debug('No oauth_server_to_server credential in workspace.json')
  }

  console.log('\n🔗 Connecting local workspace to remote workspace...')
  const absProjectDir = path.resolve(projectDir)
  const escapedDir = absProjectDir.replace(/'/g, "'\\''")
  await runCommand(`cd '${escapedDir}' && aio app use workspace.json -m`)

  aioLogger.debug('Checkout setup complete')
}
