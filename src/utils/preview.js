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
    const url = new URL(`https://admin.hlx.page/preview/${org}/${repo}/main${pathname}`)
    aioLogger.debug(`Previewing at ${url}`)

    let result
    try {
      const res = await fetch(url, { method: 'POST' })
      if (res.status !== 200) {
        result = { source: files[i], status: 'failed', message: `Failed to preview ${files[i]}` }
      } else {
        result = { source: files[i], status: 'success' }
      }
    } catch (error) {
      result = { source: files[i], status: 'error', message: error.message }
    }
    aioLogger.debug('preview result:', result)
    results.push(result)

    if (i < files.length - 1) {
      await delay(interval) // wait for the interval before making the next request
    }
  }

  const successes = results.filter(({ status }) => status === 'success')
  const failures = results.filter(({ status }) => status === 'failed' || status === 'error')

  aioLogger.log(`Previewed ${successes.length} files.`)
  failures.length ?? aioLogger.error(`Had issues with ${failures.length} files.`)
  failures.length ?? aioLogger.debug(failures)
  return results
}
