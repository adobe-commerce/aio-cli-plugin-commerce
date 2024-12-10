import { org, repo } from './constants.js'
import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:scaffold:preview.js')
/**
 *
 * @param Array files
 * @param files
 */
export async function preview (files) {
  const results = []
  await Promise.all(
    files.map(async (file) => {
      aioLogger.debug('url', file)
      let { pathname } = new URL(file)
      if (pathname.endsWith('/')) {
        pathname = pathname.replace(/\/$/, '/index')
      }
      const url = new URL(`https://admin.hlx.page/preview/${org}/${repo}/main${pathname}`)
      aioLogger.debug(`Previewing at ${url}`)

      let result
      try {
        const res = await fetch(url, { method: 'POST' })
        if (res.status !== 200) {
          result = { file, status: 'failed', message: `Failed to preview ${file}` }
        } else {
          result = { file, status: 'success' }
        }
      } catch (error) {
        result = { file, status: 'error', message: error.message }
      }
      aioLogger.debug('preview result:', result)
      results.push(result)
    })
  )
  const successes = results.filter(({ status }) => status === 'success').length
  aioLogger.log(`Previewed ${successes} files.`)
  return results
}
