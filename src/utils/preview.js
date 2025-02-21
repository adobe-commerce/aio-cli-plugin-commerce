import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:preview.js')

/**
 * https://www.aem.live/docs/admin.html#tag/preview/operation/bulkPreview
 * @param files
 */
export async function previewContent (files) {
  const { org, repo } = config.get('commerce.github')
  if (!org || !repo) throw new Error('Missing Github Org and Repo')
  console.log('⏳ Previewing some necessary files...')
  const url = new URL(`https://admin.hlx.page/preview/${org}/${repo}/main/*`)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paths: ['/*']
      })
    })
    if (res.status !== 200) {
      aioLogger.debug(res)
      console.log(`❌ Had issues previewing files. Please try the CLI command again with AIO_LOG_LEVEL=debug for more information, or try manually publishing your content from the document authoring page at https://da.live/#/${org}/${repo}`)
    } else {
      console.log('✅ Started batch preview job.')
    }
  } catch (error) {
    console.log(`❌ Had issues previewing files. Please try the CLI command again with AIO_LOG_LEVEL=debug for more information, or try manually publishing your content from the document authoring page at https://da.live/#/${org}/${repo}`)
    aioLogger.debug(error)
  }
}

/**
 * For DA Live Preview, we must publish some files. This must be done AFTER preview.
 * https://www.aem.live/docs/admin.html#tag/publish/operation/bulkPublish
 */
export async function publishContent () {
  const { org, repo } = config.get('commerce.github')
  if (!org || !repo) throw new Error('Missing Github Org and Repo')
  console.log('⏳ Publishing some necessary files...')
  const url = new URL(`https://admin.hlx.page/live/${org}/${repo}/main/*`)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paths: ['/*']
      })
    })
    if (res.status !== 200) {
      console.log(`❌ Had issues publishing files. Please try the CLI command again with AIO_LOG_LEVEL=debug for more information, or try manually publishing your content from the document authoring page at https://da.live/#/${org}/${repo}`)
      aioLogger.debug(res)
    } else {
      console.log('✅ Started batch publish job.')
    }
  } catch (error) {
    console.log(`❌ Had issues publishing files. Please try the CLI command again with AIO_LOG_LEVEL=debug for more information, or try manually publishing your content from the document authoring page at https://da.live/#/${org}/${repo}`)
    aioLogger.debug(error)
  }
}
