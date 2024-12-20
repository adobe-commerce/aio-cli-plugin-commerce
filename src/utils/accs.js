import ims from '@adobe/aio-lib-ims'
import { promptSelect } from './prompt.js'
import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:accs.js')
const CCM_BASE_URL = 'https://core-commerce-saas-cloud-manager-service-deploy-et-16fe67.corp.ethos501-stage-va6.ethos.adobe.net'

// TODO: Use logic from mesh to get the list of ims orgs and select one. For now, we use a hardcoded value.
const IMS_ORG = '239B1986676205D50A494138@AdobeOrg'
// A list of some default tenant (can remove later)
const DEFAULT_TENANTS = [
  'ACCS Test Mesh: https://edge-stage-graph.adobe.io/api/2364b3f0-c3df-47ff-bb75-65f2d55973f2/graphql'
]
const urlPattern = /https:\/\/[^\s]+/g
/**
 *
 */
export async function getAndSelectInstances () {
  // get ims token
  await ims.context.setCurrent('cli')
  const token = await ims.getToken('cli')

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
    aioLogger.debug('selected', urlMatch)
    return urlMatch
  } else {
    throw Error('Something went wrong selecting an ACCS instance.')
  }
}
