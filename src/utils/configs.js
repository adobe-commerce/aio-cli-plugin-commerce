import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:configs.js')

/**
 * Overwrites default config values based on user inputs in prior steps.
 *
 * Notes: We will use mesh or other endpoint urls if provided. If none are
 * defined (mesh or saas) we use the default value from the
 * source config.
 *
 * @param configSource  the config source as string or json
 * @returns modified config, with values desired by user
 */
export function modifyConfig (configSource) {
  const { saas, meshUrl } = config.get('commerce.datasource')
  const { org: gitOrg, repo: gitRepo } = config.get('commerce.github')

  // convert source to json if a string
  let configJson = configSource
  if (typeof configSource === 'string') {
    configJson = JSON.parse(configSource)
  }

  // TODO: USF-1882: Query backend (commerce-endpoint + commerce-core-endpoint) for the values needed here.
  configJson.data = configJson.data.map((item) => {
    switch (item.key) {
      case 'commerce-endpoint':
        item.value = meshUrl || saas || item.value
        break
      case 'commerce-core-endpoint':
        item.value = meshUrl || saas || item.value
        break
      case 'commerce-store-url':
        item.value = `https://main--${gitRepo}--${gitOrg}.aem.live/`
        break
      case 'commerce.headers.cs.Magento-Environment-Id':
        item.value = config.get('commerce.environmentId') || item.value
        break
      case 'commerce.headers.cs.x-api-key':
        item.value = config.get('commerce.apiKey') || item.value
        break
      default:
        aioLogger.debug(`NOT overwriting ${item.key}: ${item.value}`)
        break
    }

    return item
  })
  aioLogger.debug('modified config:', JSON.stringify(configJson, null, 2))
  return JSON.stringify(configJson)
}

/**
 * Modifies block library config and replaces references with new org/site
 * @param configSource
 * @returns stringified config
 */
export function modifyDaBlockLibraryConfig (configSource) {
  const { org: gitOrg, repo: gitRepo } = config.get('commerce.github')
  // convert source to json if a string
  let configJson = configSource
  if (typeof configSource === 'string') {
    configJson = JSON.parse(configSource)
  }
  aioLogger.debug('pre-modificaiton block config:', JSON.stringify(configJson, null, 2))
  configJson.data.data = configJson.data.data.map(item => {
    item.path = item.path.replace('adobe-commerce/boilerplate', `${gitOrg}/${gitRepo}`)
    return item
  })

  aioLogger.debug('modified block config:', JSON.stringify(configJson, null, 2))
  return JSON.stringify(configJson)
}

/**
 * Creates a da site config for DA library
 * @returns stringified config
 */
export function createDaSiteConfig () {
  const { org: gitOrg, repo: gitRepo } = config.get('commerce.github')
  const basePath = `https://content.da.live/${gitOrg}/${gitRepo}/.da/library`

  const configJson = {
    data: {
      total: 1,
      limit: 1,
      offset: 0,
      data: [{}],
      ':colWidths': []
    },
    library: {
      total: 2,
      limit: 2,
      offset: 0,
      data: [
        {
          title: 'Blocks',
          path: `${basePath}/blocks.json`,
          format: ''
        },
        {
          title: 'Icons',
          path: `${basePath}/icons.json`,
          format: ':<content>:'
        }
      ],
      ':colWidths': [75, 500, 100]
    },
    ':names': ['data', 'library'],
    ':version': 3,
    ':type': 'multi-sheet'
  }
  aioLogger.debug('created da site config:', JSON.stringify(configJson, null, 2))
  return JSON.stringify(configJson)
}
