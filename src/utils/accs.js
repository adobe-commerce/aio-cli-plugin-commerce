import ims from '@adobe/aio-lib-ims'
import { promptSelect } from './prompt.js'
import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
import CONSTANTS from './constants.js'

const aioLogger = Logger('commerce:accs.js')
const { CCM_BASE_URL } = CONSTANTS

// A list of some default tenant (can remove later)
const DEFAULT_TENANTS = [
  'Test OneGraph Endpoint: https://na1-sandbox.api.commerce.adobe.com/Vi7V652YrG2CcCR1WAYPXg/graphql'
]

const urlPattern = /https:\/\/[^\s]+/g

/**
 * Uses current IMS Org to fetch tenants and allows user to select one from list.
 */
export async function getAndSelectInstances () {
  try {
    const { code: IMS_ORG, name } = config.get('console.org')
    aioLogger.debug(`Looking up available tenants in the "${name}" IMS Organization`)
    // get ims token
    await ims.context.setCurrent('cli')
    const token = await ims.getToken('cli')
    aioLogger.debug(`Fetch: ${CCM_BASE_URL}/api/v1/tenants/owner/${IMS_ORG}`)
    const resp = await fetch(`${CCM_BASE_URL}/api/v1/tenants/owner/${IMS_ORG}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(async resp => {
      const respJson = await resp.json()
      aioLogger.debug('received response', respJson)
      return respJson
    })

    if (resp?.title === 'ErrInvalidOauthToken') {
      aioLogger.error('Invalid auth token received. Re-authenticate with `aio logout` and `aio login`.')
    }

    const choices = DEFAULT_TENANTS.concat(
      resp?.tenants?.map(tenant => `${tenant.name}: ${tenant.serviceURLs.graphQL}`) || []
    )

    const choice = await promptSelect(
      'Select tenant (type to search)',
      choices
    )
    const urlMatch = choice.match(urlPattern)
    aioLogger.debug('selected', urlMatch[0])

    try {
      const chosen = resp?.tenants?.find(tenant => tenant.serviceURLs.graphQL === urlMatch[0])
      if (chosen) {
        config.set('commerce.datasource.admin', chosen.serviceURLs.admin)
      } else {
        // no admin url
        aioLogger.debug('unable to get admin url')
      }
    } catch (e) {
      aioLogger.debug('unable to get admin url')
    }
    return urlMatch[0]
  } catch (e) {
    aioLogger.log('Tenant API is not available. Check your aio IMS Org settings and try again.')
    throw new Error(e)
  }
}
