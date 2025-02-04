import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:preview.js')

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Given an array of filenames, uses the hlx admin api to preview the content.
 * This function accounts for the rate limiting imposed on the API by previewing
 * 10 files every second.
 * @param {Array} files the array of files to be previewed
 * @returns {Promise<Array>} that resolves to the array of results
 */
export async function previewContent (files) {
  const { org, repo } = config.get('commerce.github')
  if (!org || !repo) throw new Error('Missing Github Org and Repo')
  console.log('⏳ Previewing files, this may take some time...')

  const results = []
  const batchSize = 10
  let i = 0

  while (i < files.length) {
    const chunk = files.slice(i, Math.min(i + batchSize, files.length))
    const chunkPromises = chunk.map(file => previewFile(file))
    await Promise.all(chunkPromises)
    await delay(1000)
    i += batchSize
  }

  /**
   * TODO refactor this and publish
   * @param file
   */
  async function previewFile (file) {
    let { pathname } = new URL(file)
    if (pathname.endsWith('/')) {
      pathname = pathname.replace(/\/$/, '/index')
    }
    const url = new URL(`https://admin.hlx.page/preview/${org}/${repo}/main${pathname}`)

    aioLogger.debug(`Previewing {
      "origin": "${file}",
      "destination": "https://da.live/edit#/${org}/${repo}${pathname.replace(/\.[^.]+$/, '')}"
    }`)

    let result
    try {
      const res = await fetch(url, { method: 'POST' })
      if (res.status !== 200) {
        result = { source: file, status: 'failed', message: `Failed to preview https://da.live/edit#/${org}/${repo}${pathname.replace(/\.[^.]+$/, '')}` }
        aioLogger.debug(res)
      } else {
        result = { source: file, status: 'success' }
      }
    } catch (error) {
      result = { source: file, status: 'error', message: error.message }
      aioLogger.debug(error)
    }
    results.push(result)
  }

  const successes = results.filter(({ status }) => status === 'success')
  const failures = results.filter(({ status }) => status === 'failed' || status === 'error')

  if (failures.length) {
    console.log(`❌ Had issues with ${failures.length} files. Please try the CLI command again with AIO_LOG_LEVEL=debug for more information, or try manually previewing your content from the document authoring page at https://da.live/#/${org}/${repo}`)
    aioLogger.debug(failures)
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
  const batchSize = 10
  let i = 0

  while (i < filesToPublish.length) {
    const chunk = filesToPublish.slice(i, Math.min(i + batchSize, filesToPublish.length))
    const chunkPromises = chunk.map(file => publishFile(file))
    await Promise.all(chunkPromises)
    await delay(1000)
    i += batchSize
  }

  /**
   *
   * @param file
   * @param pathname
   */
  async function publishFile (pathname) {
    const url = new URL(`https://admin.hlx.page/live/${org}/${repo}/main${pathname}`)

    aioLogger.debug(`Publishing {
        "origin": "${pathname}",
        "destination": "https://da.live/edit#/${org}/${repo}${pathname.replace(/\.[^.]+$/, '')}"
      }`)

    let result
    try {
      const res = await fetch(url, { method: 'POST' })
      if (res.status !== 200) {
        result = { source: pathname, status: 'failed', message: `Failed to publish https://da.live/edit#/${org}/${repo}${pathname.replace(/\.[^.]+$/, '')}` }
        aioLogger.debug(res)
      } else {
        result = { source: pathname, status: 'success' }
      }
    } catch (error) {
      result = { source: pathname, status: 'error', message: error.message }
      aioLogger.debug(error)
    }
    results.push(result)
  }

  const successes = results.filter(({ status }) => status === 'success')
  const failures = results.filter(({ status }) => status === 'failed' || status === 'error')

  if (failures.length) {
    console.log(`❌ Had issues with ${failures.length} files. Please try the CLI command again with AIO_LOG_LEVEL=debug for more information, or try manually publishing your content from the document authoring page at https://da.live/#/${org}/${repo}`)
    aioLogger.debug(failures)
  }
  console.log(`✅ Published ${successes.length} files.`)
  return results
}
