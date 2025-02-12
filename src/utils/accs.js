import ims from '@adobe/aio-lib-ims'
import { promptSelect } from './prompt.js'
import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:accs.js')

const isProdIms = config.get('cli.env') === 'prod'
const CCM_BASE_URL = isProdIms
  ? 'https://core-commerce-saas-cloud-manager-service.corp.ethos340-prod-va6.ethos.adobe.net'
  : 'https://core-commerce-saas-cloud-manager-service-deploy-et-16fe67.corp.ethos501-stage-va6.ethos.adobe.net'

// A list of some default tenant (can remove later)
const DEFAULT_TENANTS = [
  'Test OneGraph Endpoint: https://na1-sandbox.api.commerce.adobe.com/F1psVHfVkXhcQxhqNbCora/graphql'
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
      resp?.tenants?.map(tenant => `${tenant.name}: ${tenant.instanceURL}/graphql`) || []
    )

    const choice = await promptSelect(
      'Select tenant',
      choices
    )
    const urlMatch = choice.match(urlPattern)
    aioLogger.debug('selected', urlMatch[0])
    return urlMatch[0]
  } catch (e) {
    aioLogger.log('Tenant API is not available. Check your aio IMS Org settings and try again.')
    throw new Error(e)
  }
}
