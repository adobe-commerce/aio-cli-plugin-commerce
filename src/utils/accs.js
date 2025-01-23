import ims from '@adobe/aio-lib-ims'
import { promptSelect } from './prompt.js'
import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:accs.js')
// TODO: Update to publicly available URL
const CCM_BASE_URL = 'https://core-commerce-saas-cloud-manager-service-deploy-et-16fe67.corp.ethos501-stage-va6.ethos.adobe.net'

// A list of some default tenant (can remove later)
const DEFAULT_TENANTS = [
  'Test OneGraph Endpoint: https://core-commerce-saas-storefront-router-service-qa.ethos501-stage-va6.ethos.adobe.net/9JjnV3amskX6mEeyYADfiP/graphql'
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

  // TODO: /graphql/ is appended to resp.tenants.instanceURL because the resp doesnt contain the graphql API unlike the UI which shows it.
  const choice = await promptSelect(
    'Select tenant',
    resp.tenants.map(tenant => `${tenant.name}: ${tenant.instanceURL}/graphql/`).concat(DEFAULT_TENANTS)
  )
  const urlMatch = choice.match(urlPattern)

  if (urlMatch) {
    aioLogger.debug('selected', urlMatch[0])
    return urlMatch[0]
  } else {
    throw Error('Something went wrong selecting an ACCS instance.')
  }
}
