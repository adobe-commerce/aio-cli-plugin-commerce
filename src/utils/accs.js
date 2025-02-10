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
 *
 */
export async function getAndSelectInstances () {
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
  }).then(async resp => await resp.json())

  const choices = DEFAULT_TENANTS.concat(
    resp?.tenants?.map(tenant => `${tenant.name}: ${tenant.instanceURL}/graphql`) || []
  )

  const choice = await promptSelect(
    'Select tenant',
    choices
  )
  const urlMatch = choice.match(urlPattern)

  if (urlMatch) {
    aioLogger.debug('selected', urlMatch[0])
    return urlMatch[0]
  } else {
    throw Error('Something went wrong selecting an ACCS instance.')
  }
}
