import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
import { fetchWithRetry } from './fetchWithRetry'
const aioLogger = Logger('commerce:preview.js')

// TODO: DRY - only diff for the preview/publish functions is the API url and log detail (use of term preview vs publish).
// we should refactor
/**
 * https://www.aem.live/docs/admin.html#tag/preview/operation/bulkPreview
 * TODO: update to take paths, instead of full urls
 * @param files urls whose paths we will preview
 */
export async function previewContent (files) {
  const { org, repo } = config.get('commerce.github')
  if (!org || !repo) throw new Error('Missing Github Org and Repo')
  const url = new URL(`https://admin.hlx.page/preview/${org}/${repo}/main/*`)
  try {
    const previewFiles = files.map(file => new URL(file).pathname)
    aioLogger.debug(previewFiles)
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paths: [...previewFiles]
      })
    })
    aioLogger.debug(res)
    if (res.status !== 202) {
      console.log(`❌ Had issues previewing files. Please try the CLI command again with AIO_LOG_LEVEL=debug for more information, or try manually publishing your content from the document authoring page at https://da.live/#/${org}/${repo}`)
    } else {
      const resJson = await res.json()
      const detailsUrl = `${resJson.links.self}/details`
      aioLogger.debug(detailsUrl)
      console.log('⏳ Started batch content preview job.')
      await fetchWithRetry(detailsUrl, {}, (data) => {
        return data.data.phase === 'completed' &&
          data.progress.processed === previewFiles.length &&
          data.progress.success === previewFiles.length
      })
      console.log('✅ Batch content preview job completed successfully.')
    }
  } catch (error) {
    console.log(`❌ Had issues previewing files. Please try the CLI command again with AIO_LOG_LEVEL=debug for more information, or try manually publishing your content from the document authoring page at https://da.live/#/${org}/${repo}`)
    aioLogger.debug(error)
  }
}

/**
 *
 * https://www.aem.live/docs/admin.html#tag/publish/operation/bulkPublish
 * @param files
 */
export async function publishContent (files) {
  const { org, repo } = config.get('commerce.github')
  if (!org || !repo) throw new Error('Missing Github Org and Repo')
  const url = new URL(`https://admin.hlx.page/live/${org}/${repo}/main/*`)
  try {
    const publishFiles = files.map(file => new URL(file).pathname)
    aioLogger.debug(publishFiles)
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paths: [...publishFiles]
      })
    })
    aioLogger.debug(res)
    if (res.status !== 202) {
      console.log(`❌ Had issues publishing files. Please try the CLI command again with AIO_LOG_LEVEL=debug for more information, or try manually publishing your content from the document authoring page at https://da.live/#/${org}/${repo}`)
    } else {
      const resJson = await res.json()
      const detailsUrl = `${resJson.links.self}/details`
      aioLogger.debug(detailsUrl)
      console.log('⏳ Started batch content publish job.')
      await fetchWithRetry(detailsUrl, {}, (data) => {
        return data.data.phase === 'completed' &&
          data.progress.processed === publishFiles.length &&
          data.progress.success === publishFiles.length
      })
      console.log('✅ Batch content publish job completed successfully.')
    }
  } catch (error) {
    console.log(`❌ Had issues publishing files. Please try the CLI command again with AIO_LOG_LEVEL=debug for more information, or try manually publishing your content from the document authoring page at https://da.live/#/${org}/${repo}`)
    aioLogger.debug(error)
  }
}
