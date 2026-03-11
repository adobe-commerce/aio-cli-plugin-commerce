import ims from '@adobe/aio-lib-ims'
import { promptSelect } from './prompt.js'
import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
import CONSTANTS from './constants.js'

const aioLogger = Logger('commerce:accs.js')
const { CCM_BASE_URL } = CONSTANTS

const urlPattern = /https:\/\/[^\s]+/g

/**
 * Fetches Commerce instances from the Tenant API for the current IMS Org
 * and prompts the user to select one.
 *
 * @returns {Promise<string>} The selected Commerce GraphQL endpoint URL
 * @throws {Error} When the API is unavailable, auth fails, or no instances are found
 */
export async function getAndSelectInstances () {
  const consoleOrg = config.get('console.org')
  if (!consoleOrg) {
    throw new Error('No org selected. Run `aio console org select` first.')
  }
  const IMS_ORG = consoleOrg.code ?? consoleOrg.id ?? consoleOrg.ims_org_id
  const name = consoleOrg.name
  if (!IMS_ORG) {
    throw new Error('Console org config is missing org identifier (code/id). Try reselecting org with `aio console org select`.')
  }

  aioLogger.debug(`Looking up available tenants in the "${name}" IMS Organization`)

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
    throw new Error(`No Commerce instances found for org "${name}".`)
  }

  const choices = tenants.map(tenant => `${tenant.name}: ${tenant.serviceURLs.graphQL}`)

  const choice = await promptSelect(
    'Select Commerce instance (type to search)',
    choices
  )
  const urlMatch = choice.match(urlPattern)
  aioLogger.debug('selected', urlMatch[0])

  try {
    const chosen = tenants.find(tenant => tenant.serviceURLs.graphQL === urlMatch[0])
    if (chosen) {
      config.set('commerce.datasource.admin', chosen.serviceURLs.admin)
    }
  } catch (e) {
    aioLogger.debug('unable to get admin url')
  }
  return urlMatch[0]
}
