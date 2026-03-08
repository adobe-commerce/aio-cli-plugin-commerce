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

/**
 * Copies workspace.json to scripts/onboarding/config/ and scripts/ within the project.
 * Creates directories if they do not exist.
 *
 * @param {string} projectDir - Project root directory
 */
export function copyWorkspaceConfig (projectDir) {
  const sourcePath = path.join(projectDir, 'workspace.json')

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`workspace.json not found at ${sourcePath}. Run downloadWorkspaceConfig first.`)
  }

  const onboardingConfigDir = path.join(projectDir, 'scripts', 'onboarding', 'config')
  const scriptsDir = path.join(projectDir, 'scripts')

  if (!fs.existsSync(onboardingConfigDir)) {
    fs.mkdirSync(onboardingConfigDir, { recursive: true })
  }
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true })
  }

  fs.copyFileSync(sourcePath, path.join(onboardingConfigDir, 'workspace.json'))
  fs.copyFileSync(sourcePath, path.join(scriptsDir, 'workspace.json'))

  aioLogger.debug('Copied workspace.json to onboarding config and scripts')
}

/**
 * Extracts OAuth server-to-server credentials from workspace.json.
 * OAUTH_ORG_ID uses org.ims_org_id (e.g. 045013D3664331DC0A495CD5@AdobeOrg).
 *
 * @param {string} workspaceJsonPath - Path to workspace.json
 * @returns {object|null} { clientId, clientSecret, technicalAccountId, technicalAccountEmail, orgId } or null if no oauth_server_to_server credential
 */
export function extractOAuthCredentials (workspaceJsonPath) {
  if (!fs.existsSync(workspaceJsonPath)) {
    throw new Error(`workspace.json not found at ${workspaceJsonPath}`)
  }
  const content = fs.readFileSync(workspaceJsonPath, 'utf-8')
  let data
  try {
    data = JSON.parse(content)
  } catch (err) {
    throw new Error(`Invalid JSON in workspace.json: ${err.message}`)
  }

  const credentials = data?.project?.workspace?.details?.credentials ?? []
  const oauthCred = credentials.find(
    (c) => c.integration_type === 'oauth_server_to_server'
  )

  if (!oauthCred?.oauth_server_to_server) {
    return null
  }

  const oauth = oauthCred.oauth_server_to_server
  const orgId = data?.project?.org?.ims_org_id

  return {
    clientId: oauth.client_id ?? '',
    clientSecret: oauth.client_secrets?.[0] ?? '',
    technicalAccountId: oauth.technical_account_id ?? '',
    technicalAccountEmail: oauth.technical_account_email ?? '',
    orgId: String(orgId ?? '')
  }
}

/**
 * Extracts workspace IDs from workspace.json for .env (IO_CONSUMER_ID, IO_PROJECT_ID, IO_WORKSPACE_ID).
 * IO_CONSUMER_ID uses org.id (e.g. 3117813).
 *
 * @param {string} workspaceJsonPath - Path to workspace.json
 * @returns {object} { consumerId, projectId, workspaceId } - strings, may be empty if not found
 */
export function extractWorkspaceIds (workspaceJsonPath) {
  if (!fs.existsSync(workspaceJsonPath)) {
    throw new Error(`workspace.json not found at ${workspaceJsonPath}`)
  }
  const content = fs.readFileSync(workspaceJsonPath, 'utf-8')
  let data
  try {
    data = JSON.parse(content)
  } catch (err) {
    throw new Error(`Invalid JSON in workspace.json: ${err.message}`)
  }

  const project = data?.project ?? {}
  const org = project.org ?? {}
  const workspace = project.workspace ?? {}

  return {
    consumerId: String(org.id ?? ''),
    projectId: String(project.id ?? ''),
    workspaceId: String(workspace.id ?? '')
  }
}
