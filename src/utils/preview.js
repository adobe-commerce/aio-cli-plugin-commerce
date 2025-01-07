import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:preview.js')

/**
 *
 * @param files
 */
export async function previewContent (files) {
  const { org, repo } = config.get('commerce.github')
  if (!org || !repo) throw new Error('Missing Github Org and Repo')
  console.log('⏳ Previewing files, this may take some time...')
  const results = []
  const rateLimit = 10 // 10 requests per second
  const interval = 1000 / rateLimit // interval in milliseconds

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  for (let i = 0; i < files.length; i++) {
    aioLogger.debug('ORIGIN:', files[i])
    let { pathname } = new URL(files[i])
    if (pathname.endsWith('/')) {
      pathname = pathname.replace(/\/$/, '/index')
    }
    aioLogger.debug('DESTINATION:', `https://da.live/#/${org}/${repo}${pathname.replace(/\.[^.]+$/, '')}`)
    const url = new URL(`https://admin.hlx.page/preview/${org}/${repo}/main${pathname}`)
    aioLogger.debug(`Previewing: ${url}`)

    let result
    // TODO: refactor this retry/delay logic to be better!
    try {
      const res = await fetch(url, { method: 'POST' })
      if (res.status !== 200) {
        result = { source: files[i], status: 'failed', message: `Failed to preview https://da.live/#/${org}/${repo}${pathname.replace(/\.[^.]+$/, '')}` }
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
    console.error(`❌ Had issues with ${failures.length} files. Please try the CLI command again with AIO_LOG_LEVEL=debug for more information, or try manually previewing your content from the document authoring page at https://da.live/#/${org}/${repo}`)
    aioLogger.error(failures)
  }
  console.log(`✅ Previewed ${successes.length} files.`)
  return results
}

const filesToPublish = [
  '/configs.json',
  '/placeholders.json',
  // TODO: nav, footer, and mini-cart are only necessary for base boilerplate, not citisignal. Add logic to conditionally determine whether we need to publish these at all. We may need to find if there are any citisignal files which need publishing too.
  '/nav',
  '/footer',
  '/mini-cart'
]
/**
 * For DA Live Preview, we must publish some files. This must be done AFTER preview.
 */
export async function publishContent () {
  const { org, repo } = config.get('commerce.github')
  if (!org || !repo) throw new Error('Missing Github Org and Repo')
  console.log('⏳ Publishing some necessary files...')
  const results = []
  const rateLimit = 10 // 10 requests per second
  const interval = 1000 / rateLimit // interval in milliseconds

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  for (let i = 0; i < filesToPublish.length; i++) {
    const pathname = filesToPublish[i]
    const url = new URL(`https://admin.hlx.page/live/${org}/${repo}/main${pathname}`)
    aioLogger.debug(`Publishing at ${url}`)

    let result
    try {
      const res = await fetch(url, { method: 'POST' })
      if (res.status !== 200) {
        result = { source: filesToPublish[i], status: 'failed', message: `Failed to publish ${filesToPublish[i]}` }
        aioLogger.debug(res)
      } else {
        result = { source: filesToPublish[i], status: 'success' }
      }
    } catch (error) {
      result = { source: filesToPublish[i], status: 'error', message: error.message }
      aioLogger.debug(error)
    }
    results.push(result)

    if (i < filesToPublish.length - 1) {
      await delay(interval) // wait for the interval before making the next request
    }
  }

  const successes = results.filter(({ status }) => status === 'success')
  const failures = results.filter(({ status }) => status === 'failed' || status === 'error')

  if (failures.length) {
    aioLogger.error(`❌ Had issues with ${failures.length} files. Please try the CLI command again with AIO_LOG_LEVEL=debug for more information, or try manually publishing your content from the document authoring page at https://da.live/#/${org}/${repo}`)
    aioLogger.debug(failures)
  }
  console.log(`✅ Published ${successes.length} files.`)
  return results
}
