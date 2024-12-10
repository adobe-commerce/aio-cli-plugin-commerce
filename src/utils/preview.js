import { org, repo } from './constants.js'
/**
 * TODO; https://github.com/adobe/da-live/blob/main/blocks/start/start.js#L77-L115
 * runCommand('curl POST https://admin.hlx.page/preview/${org}/${repo}/main/${aem-parts}<fileurl>')
 * @param Array files
 * @param files
 */
export async function preview (files) {
  const results = []

  await Promise.all(
    files.map(async (file) => {
      console.log('url', file)
      let { pathname } = new URL(file)
      if (pathname.endsWith('/')) {
        pathname = pathname.replace(/\/$/, '/index')
      }
      const url = new URL(`https://admin.hlx.page/preview/${org}/${repo}/main${pathname}`)
      console.log(`Previewing at ${url}`)

      try {
        const res = await fetch(url, { method: 'POST' })
        if (res.status !== 200) {
          results.push({ file, status: 'failed', message: `Failed to preview ${file}` })
        } else {
          results.push({ file, status: 'success' })
        }
      } catch (error) {
        results.push({ file, status: 'error', message: error.message })
      }
    })
  )

  return results
}
