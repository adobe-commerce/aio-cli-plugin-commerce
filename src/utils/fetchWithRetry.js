import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:fetchWithRetry.js')

/**
 *
 * @param {string} url [string] the url to fetch
 * @param {object} options fetch options
 * @param {Function} callback function receives data from response and can return true to stop retrying. Defaults to a function that returns true.
 * @param {number} interval delay between retries in milliseconds defaults to 5000
 * @param {number} maxRetries number of retries defaults to 10
 */
export async function fetchWithRetry (url, options = {}, callback = () => true, interval = 5000, maxRetries = 10) {
  let retryCount = 0
  while (retryCount <= maxRetries) {
    const res = await fetch(url, options)
    if (res.ok) {
      const data = await res.json()
      aioLogger.debug(data)
      const isComplete = await callback(data)
      if (isComplete) {
        return
      }
    } else {
      aioLogger.debug(`fetch failed, retrying (${retryCount + 1}/${maxRetries})`, res)
    }

    await new Promise(resolve => setTimeout(resolve, interval))
    retryCount++
  }
  throw new Error('fetch failed after max retries')
}
