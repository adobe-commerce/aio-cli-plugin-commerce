import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:scaffold:preview.js')
/**
 *
 * @param files
 */
export async function preview (files) {
  const { github: { org, repo } } = config.get()
  if (!org || !repo) throw new Error('Missing Github Org and Repo')
  aioLogger.log('Previewing files, this may take some time...')
  const results = []
  const rateLimit = 10 // 10 requests per second
  const interval = 1000 / rateLimit // interval in milliseconds

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  for (let i = 0; i < files.length; i++) {
    aioLogger.debug('url', files[i])
    let { pathname } = new URL(files[i])
    if (pathname.endsWith('/')) {
      pathname = pathname.replace(/\/$/, '/index')
    }
    if (pathname.endsWith('.png')) {
      // TODO: fix this, if necessary
      aioLogger.debug('cannot preview png files')
      continue
    }
    const url = new URL(`https://admin.hlx.page/preview/${org}/${repo}/main${pathname}`)
    aioLogger.debug(`Previewing at ${url}`)

    let result
    try {
      const res = await fetch(url, { method: 'POST' })
      if (res.status !== 200) {
        result = { source: files[i], status: 'failed', message: `Failed to preview ${files[i]}` }
        aioLogger.debug(res)
      } else {
        result = { source: files[i], status: 'success' }
      }
    } catch (error) {
      result = { source: files[i], status: 'error', message: error.message }
      aioLogger.debug(error)
    }
    results.push(result)

    if (i < files.length - 1) {
      await delay(interval) // wait for the interval before making the next request
    }
  }

  const successes = results.filter(({ status }) => status === 'success')
  const failures = results.filter(({ status }) => status === 'failed' || status === 'error')

  if (failures.length) {
    aioLogger.error(`Had issues with ${failures.length} files. Please try the CLI command again with AIO_LOG_LEVEL=debug for more information, or try manually previewing your content from the document authoring page at https://da.live/#/${org}/${repo}`)
    aioLogger.debug(failures)
  }
  aioLogger.log(`Previewed ${successes.length} files.`)
  return results
}
