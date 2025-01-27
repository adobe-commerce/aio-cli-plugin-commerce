import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:configs.js')
/**
 * @param configSource the config source as string or json
 * @returns modified config, with values desired by user
 */
export function modifyConfig (configSource) {
  const { meshUrl } = config.get('commerce.datasource')
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
        item.value = meshUrl || item.value
        break
      case 'commerce-core-endpoint':
        item.value = meshUrl || item.value
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
