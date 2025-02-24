import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:preview.js')

// TODO: DRY - only diff for the preview/publish functions is the API url and log detail (use of term preview vs publish).
// we should refactor
/**
 * https://www.aem.live/docs/admin.html#tag/preview/operation/bulkPreview
 * // TODO: update to take paths, instead of full urls
 * @param files urls whose paths we will preview
 */
export async function previewContent (files) {
  const { org, repo } = config.get('commerce.github')
  if (!org || !repo) throw new Error('Missing Github Org and Repo')
  try {
    const previewFiles = files.map(file => new URL(file).pathname)
    aioLogger.debug(previewFiles)
    const url = new URL(`https://admin.hlx.page/preview/${org}/${repo}/main/*`)
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paths: [...previewFiles]
      })
    })
    if (res.status !== 202) {
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
 * https://www.aem.live/docs/admin.html#tag/publish/operation/bulkPublish
 */
export async function publishContent () {
  const { org, repo } = config.get('commerce.github')
  if (!org || !repo) throw new Error('Missing Github Org and Repo')
  const url = new URL(`https://admin.hlx.page/live/${org}/${repo}/main/*`)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paths: [...filesToPublish]
      })
    })
    if (res.status !== 202) {
      aioLogger.debug(res)
      console.log(`❌ Had issues publishing files. Please try the CLI command again with AIO_LOG_LEVEL=debug for more information, or try manually publishing your content from the document authoring page at https://da.live/#/${org}/${repo}`)
    } else {
      console.log('✅ Started batch publish job.')
    }
  } catch (error) {
    console.log(`❌ Had issues publishing files. Please try the CLI command again with AIO_LOG_LEVEL=debug for more information, or try manually publishing your content from the document authoring page at https://da.live/#/${org}/${repo}`)
    aioLogger.debug(error)
  }
}
