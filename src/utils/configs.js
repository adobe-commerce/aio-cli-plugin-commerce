import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:configs.js')
/**
 *
 * @param configText the config
 * @param config
 * @param configSource
 * @param overrides
 * @returns modified config, with values desired by user
 */
export function modifyConfig (configSource, overrides) {
  const chosenApiUrl = config.get('commerce.datasource.core')
  const chosenCatalogServiceApiUrl = config.get('commerce.datasource.catalog')
  let configJson = configSource
  // convert source to json if a string
  if (typeof configSource === 'string') {
    configJson = JSON.parse(configSource)
  }

  // modify values within that we know about
  configJson.data = configJson.data.map((item) => {
    if (chosenCatalogServiceApiUrl && item.key === 'commerce-endpoint') {
      item.value = chosenCatalogServiceApiUrl
    } else if (chosenApiUrl && item.key === 'commerce-core-endpoint') {
      item.value = chosenApiUrl
    }
    return item
  })
  aioLogger.debug('modified config:', JSON.stringify(configJson, null, 2))
  return JSON.stringify(configJson)
}
