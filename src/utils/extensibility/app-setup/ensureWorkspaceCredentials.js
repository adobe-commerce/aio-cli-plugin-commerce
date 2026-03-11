/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations in the License.
*/
import config from '@adobe/aio-lib-core-config'
import ConsoleLib from '@adobe/aio-cli-lib-console'
import { getLibConsoleCLI } from '../../devConsole.js'
import { createSpinner } from '../../spinner.js'
import Logger from '@adobe/aio-lib-core-logging'

const aioLogger = Logger('commerce:app-setup:ensureWorkspaceCredentials.js')

/** Services required for Commerce extensibility - code and name */
const REQUIRED_SERVICES = [
  { code: 'ACCS-REST-API', name: 'Adobe Commerce as a Cloud Service' },
  { code: 'AdobeIOManagementAPISDK', name: 'I/O Management API' },
  { code: 'CloudIntegrationSDK', name: 'I/O Events' },
  { code: 'commerceeventing', name: 'Adobe I/O Events for Adobe Commerce' }
]

const OAUTH_S2S = 'oauth_server_to_server'

/**
 * Checks workspace.json (from getWorkspaceConfig) for oauth_server_to_server credential.
 *
 * @param {object} workspaceConfig - Workspace config from getWorkspaceConfig
 * @returns {boolean}
 */
function hasOAuthS2SCredential (workspaceConfig) {
  const credentials = workspaceConfig?.project?.workspace?.details?.credentials ?? []
  return credentials.some(
    (c) => c.integration_type === OAUTH_S2S || c.integration_type === 'oauth_server_to_server_migrate'
  )
}

/**
 * Builds serviceProperties for subscribe from enabled service objects.
 * Picks first license config when service requires it.
 *
 * @param {object[]} enabledServices - From getEnabledServicesForOrg
 * @param {string[]} codes - Service codes to include
 * @returns {object[]} serviceProperties for subscribeToServicesWithCredentialType
 */
function buildServiceProperties (enabledServices, codes) {
  const result = []
  for (const code of codes) {
    const svc = enabledServices.find((s) => s.code === code)
    if (!svc) {
      aioLogger.warn(`Service ${code} is not enabled for the organization, skipping`)
      continue
    }
    let licenseConfigs = null
    if (svc.properties?.licenseConfigs?.length) {
      licenseConfigs = [svc.properties.licenseConfigs[0]]
    }
    result.push({
      name: svc.name,
      sdkCode: svc.code,
      roles: (svc.properties && svc.properties.roles) || null,
      licenseConfigs
    })
  }
  return result
}

/**
 * Ensures the workspace has OAuth server-to-server credentials and required services.
 * Runs after org/project/workspace selection.
 * - Creates OAuth S2S credential if missing (verified via workspace config)
 * - Subscribes to required services if any are missing
 *
 * @returns {Promise<void>}
 */
export async function ensureWorkspaceCredentials () {
  console.log('\n🔐 Configuring workspace credentials and services...')

  let cleanup = () => {}
  try {
    const org = config.get('console.org')
    const project = config.get('console.project')
    const workspace = config.get('console.workspace')

    if (!org || !project || !workspace) {
      throw new Error(
        'Console org, project, and workspace must be selected. Run aio console org/project/workspace select first.'
      )
    }

    const orgId = org.id ?? org.code
    const projectId = project.id ?? project.code
    const workspaceId = workspace.id ?? workspace.code
    if (!orgId || !projectId || !workspaceId) {
      throw new Error('Invalid console config: missing org, project, or workspace id.')
    }

    const { consoleCLI } = await getLibConsoleCLI()
    cleanup = () => ConsoleLib.cleanStdOut && ConsoleLib.cleanStdOut()

    let spinner = createSpinner('Loading workspace configuration...').start()
    let workspaceConfig
    try {
      workspaceConfig = await consoleCLI.getWorkspaceConfig(orgId, projectId, workspaceId)
      spinner.succeed('Workspace configuration loaded')
    } catch (err) {
      spinner.fail('Failed to load workspace configuration')
      aioLogger.error('Failed to get workspace config:', err)
      throw new Error(`Could not load workspace config: ${err.message}`)
    }

    const hadOAuth = hasOAuthS2SCredential(workspaceConfig)
    if (!hadOAuth) {
      spinner = createSpinner('Creating OAuth server-to-server credentials...').start()
      try {
        await consoleCLI.createOAuthServerToServerCredentials(
          orgId,
          project,
          workspace,
          `aio-${workspace.id}`,
          'Auto generated OAuth S2S credentials for Commerce extensibility'
        )
        spinner.succeed('OAuth server-to-server credentials created')
      } catch (err) {
        spinner.fail('Failed to create OAuth server-to-server credentials')
        aioLogger.error('Failed to create OAuth S2S credentials:', err)
        throw new Error(`Could not create OAuth credentials: ${err.message}`)
      }
    } else {
      console.log('   ✔ OAuth server-to-server credentials already configured')
    }

    spinner = createSpinner('Checking required services...').start()
    const enabledServices = await consoleCLI.getEnabledServicesForOrg(orgId)
    const requiredCodes = REQUIRED_SERVICES.map((s) => s.code)
    const enabledCodes = new Set(enabledServices.map((s) => s.code))

    const missingInOrg = requiredCodes.filter((c) => !enabledCodes.has(c))
    if (missingInOrg.length) {
      const missingNames = missingInOrg.map((code) => {
        const svc = REQUIRED_SERVICES.find((s) => s.code === code)
        return svc ? svc.name : code
      })
      spinner.warn(
        `Some required services are not enabled for the organization: ${missingNames.join(', ')}`
      )
      console.log('      Enable them in Adobe Admin Console if needed.')
    } else {
      spinner.succeed('All required services available in organization')
    }

    let currentServiceProperties = []
    try {
      currentServiceProperties =
        await consoleCLI.getServicePropertiesFromWorkspaceWithCredentialType({
          orgId,
          projectId,
          workspace,
          supportedServices: enabledServices,
          credentialType: ConsoleLib.OAUTH_SERVER_TO_SERVER_CREDENTIAL
        })
    } catch (err) {
      aioLogger.debug('Could not get current OAuth services (credential may be new):', err.message)
    }

    const currentCodes = new Set(currentServiceProperties.map((s) => s.sdkCode))
    const missingServiceCodes = requiredCodes.filter((c) => !currentCodes.has(c))
    const availableToSubscribe = missingServiceCodes.filter((c) => enabledCodes.has(c))

    if (availableToSubscribe.length === 0) {
      if (missingServiceCodes.length === 0) {
        console.log('   ✔ All required services already subscribed')
      }
      return
    }

    const serviceProperties = buildServiceProperties(enabledServices, availableToSubscribe)
    if (serviceProperties.length === 0) {
      return
    }

    spinner = createSpinner('Subscribing to required services...').start()
    try {
      await consoleCLI.subscribeToServicesWithCredentialType({
        orgId,
        project,
        workspace,
        certDir: process.cwd(),
        serviceProperties,
        credentialType: ConsoleLib.OAUTH_SERVER_TO_SERVER_CREDENTIAL
      })
      spinner.succeed(
        `Subscribed to: ${serviceProperties.map((s) => s.name).join(', ')}`
      )
    } catch (err) {
      spinner.fail('Failed to subscribe to services')
      aioLogger.error('Failed to subscribe to services:', err)
      throw new Error(`Could not subscribe to services: ${err.message}`)
    }
  } finally {
    cleanup()
  }
}
