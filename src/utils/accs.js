import ims from '@adobe/aio-lib-ims'
import { promptSelect } from './prompt.js'
import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
import CONSTANTS from './constants.js'

const aioLogger = Logger('commerce:accs.js')
const { CCM_BASE_URL } = CONSTANTS

const urlPattern = /https:\/\/[^\s]+/g

/**
 * Fetches Commerce tenants from the Tenant API for the current IMS Org.
 *
 * @returns {Promise<{tenants: Array, orgName: string}>}
 * @throws {Error} When the API is unavailable, auth fails, or no instances are found
 */
async function fetchTenants () {
  const consoleOrg = config.get('console.org')
  if (!consoleOrg) {
    throw new Error('No org selected. Run `aio console org select` first.')
  }
  const IMS_ORG = consoleOrg.code ?? consoleOrg.id ?? consoleOrg.ims_org_id
  const orgName = consoleOrg.name
  if (!IMS_ORG) {
    throw new Error('Console org config is missing org identifier (code/id). Try reselecting org with `aio console org select`.')
  }

  aioLogger.debug(`Looking up available tenants in the "${orgName}" IMS Organization`)

  await ims.context.setCurrent('cli')
  const token = await ims.getToken('cli')

  aioLogger.debug(`Fetch: ${CCM_BASE_URL}/api/v1/tenants/owner/${IMS_ORG}`)
  const response = await fetch(`${CCM_BASE_URL}/api/v1/tenants/owner/${IMS_ORG}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const resp = await response.json()
  aioLogger.debug('received response', resp)

  if (resp?.title === 'ErrInvalidOauthToken') {
    throw new Error('Invalid auth token. Re-authenticate with `aio logout` and `aio auth login`.')
  }

  const tenants = resp?.tenants ?? []
  if (tenants.length === 0) {
    throw new Error(`No Commerce instances found for org "${orgName}".`)
  }

  return { tenants, orgName }
}

/**
 * Saves the admin URL for the chosen tenant to config.
 */
function saveAdminUrl (tenant) {
  try {
    if (tenant?.serviceURLs?.admin) {
      config.set('commerce.datasource.admin', tenant.serviceURLs.admin)
    }
  } catch (e) {
    aioLogger.debug('unable to get admin url')
  }
}

/**
 * Fetches Commerce instances from the Tenant API for the current IMS Org
 * and prompts the user to select one.
 *
 * @returns {Promise<string>} The selected Commerce GraphQL endpoint URL
 * @throws {Error} When the API is unavailable, auth fails, or no instances are found
 */
export async function getAndSelectInstances () {
  const { tenants } = await fetchTenants()

  const choices = tenants.map(tenant => `${tenant.name}: ${tenant.serviceURLs.graphQL}`)

  const choice = await promptSelect(
    'Select Commerce instance (type to search)',
    choices
  )
  const urlMatch = choice.match(urlPattern)
  aioLogger.debug('selected', urlMatch[0])

  const chosen = tenants.find(tenant => tenant.serviceURLs.graphQL === urlMatch[0])
  saveAdminUrl(chosen)
  return urlMatch[0]
}

/**
 * Finds a Commerce instance by name. If no exact match is found (case-insensitive),
 * displays the available instances and falls back to interactive selection.
 *
 * @param {string} instanceName - The instance name to search for
 * @returns {Promise<string>} The Commerce GraphQL endpoint URL
 * @throws {Error} When the API is unavailable, auth fails, or no instances are found
 */
export async function findInstanceByName (instanceName) {
  const { tenants } = await fetchTenants()

  const match = tenants.find(
    tenant => tenant.name.toLowerCase() === instanceName.toLowerCase()
  )

  if (match) {
    const url = match.serviceURLs.graphQL
    console.log(`Using Commerce instance "${match.name}": ${url}`)
    saveAdminUrl(match)
    return url
  }

  const availableNames = tenants.map(t => t.name).join(', ')
  console.log(
    `\n   ⚠️  No Commerce instance found matching "${instanceName}".` +
    `\n      Available instances: ${availableNames}` +
    '\n      Please select from the list below.\n'
  )

  const choices = tenants.map(tenant => `${tenant.name}: ${tenant.serviceURLs.graphQL}`)
  const choice = await promptSelect(
    'Select Commerce instance (type to search)',
    choices
  )
  const urlMatch = choice.match(urlPattern)
  aioLogger.debug('selected', urlMatch[0])

  const chosen = tenants.find(tenant => tenant.serviceURLs.graphQL === urlMatch[0])
  saveAdminUrl(chosen)
  return urlMatch[0]
}
