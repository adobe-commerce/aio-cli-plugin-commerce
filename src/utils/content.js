import { getAemHtml } from './importer.js'
import { modifyConfig, createDaSiteConfig, modifyDaBlockLibraryConfig } from './configs.js'
import { fetchWithRetry } from './fetchWithRetry.js'
import Logger from '@adobe/aio-lib-core-logging'
import config from '@adobe/aio-lib-core-config'
const aioLogger = Logger('commerce:content.js')

/**
 * Gets source url file paths from the Helix Admin API for the template org and
 * repo. Then each source file is transformed into expected upload file type and
 * uploaded to content repository destination.
 *
 * @param url
 * @returns [string] array of paths
 */
export async function uploadStarterContent () {
  const filePaths = await getFilePathsFromAem()
  console.log(`⏳ Cloning ${filePaths.length} content documents from source boilerplate`)
  await uploadFilesToDA(filePaths)
  await uploadDaSiteConfig()
  return filePaths
}

async function uploadDaSiteConfig () {
  const { org: gitOrg, repo: gitRepo } = config.get('commerce.github')
  const content = createDaSiteConfig()
  const formData = new FormData()
  formData.append('config', content)
  const fileDaUrl = `https://admin.da.live/config/${gitOrg}/${gitRepo}`
  await fetchWithRetry(fileDaUrl, {
    method: 'PUT',
    body: formData
  })
}
/**
 *
 */
async function getFilePathsFromAem () {
  const { org: templateOrg, repo: templateRepo } = config.get('commerce.template')
  const idxUrl = `https://main--${templateRepo}--${templateOrg}.aem.live/full-index.json`
  const index = await fetch(idxUrl).then(res => res.json())
  const paths = index.data.map(idx => idx.path) || []

  if (paths.length === 0) {
    aioLogger.debug(`No paths - does this exist? ${idxUrl}`)
  }

  // Filter out items that match "*/products/*" but keep "*/products/default"
  // and "*/products/default/*"
  // This is necessary due source content having "overlay" documents, which should not be copied.
  const filteredPaths = paths.filter((path) => {
    // Skip paths that contain "/products/" anywhere in the path
    if (path.includes('/products/')) {
      // But keep paths that end with "/products/default" or contain "/products/default/"
      if (path.endsWith('/products/default') || path.includes('/products/default/')) {
        return true
      }
      return false
    }
    return true
  })

  return filteredPaths
}

/**
 * Given text and a file path/extension, convert the object to the necessary
 * format expected by the content space.
 *
 * @param text
 * @param ext
 * @param contentFilePath
 * @param pathname
 */
async function getBlob (text, pathname) {
  const [, ext] = pathname
    .split('/')
    .pop()
    .split('.')
  const type = ext === 'json' ? 'application/json' : 'text/html'
  let content = text
  if (ext !== 'json') {
    content = await getAemHtml(text)
  } else if (pathname === '/.da/library/blocks.json') {
    content = modifyDaBlockLibraryConfig(text)
  } else if (['/configs.json', '/configs-stage.json', '/configs-dev.json'].includes(pathname)) {
    // TODO delete when helix 4 boilerplate (ccdm-demo-store/adobe-demo-store) are gone
    content = modifyConfig(text)
  }
  return new Blob([content], { type })
}

/**
 * Given a url, fetch the content of the file (from a related url) and PUT to admin.da.live/source/${org}/${repo}
 * Programatically perform what is done here: https://da.live/apps/import
 * https://github.com/da-sites/nexter/blob/d1c9efffc5af0092d91aa360e6113900bbb7854c/nx/blocks/importer/importer.js
 * @param files Array of string urls
 */
async function uploadFilesToDA (files) {
  const { org: templateOrg, repo: templateRepo } = config.get('commerce.template')
  const { org, repo } = config.get('commerce.github')
  if (!org || !repo) throw new Error('Missing Github Org and Repo')
  const daUrl = `https://admin.da.live/source/${org}/${repo}`
  const promises = files.sort().map((file) => {
    const contentFilePath = `https://main--${templateRepo}--${templateOrg}.aem.live${getContentFilePath(file)}`
    aioLogger.debug(`Fetching ${contentFilePath}`)
    return new Promise((resolve, reject) => {
      fetch(contentFilePath)
        .then(async (resp) => {
          if (!resp.ok) throw Error('File not found.')
          const { pathname } = new URL(contentFilePath)
          let blob
          if (contentFilePath.endsWith('.png') || contentFilePath.endsWith('.jpg')) {
            blob = await resp.blob()
          } else {
            blob = await getBlob(await resp.text(), pathname)
          }
          aioLogger.debug(`Got blob from ${contentFilePath}`, blob)
          const formData = new FormData()
          formData.append('data', blob)
          const daPath = pathname.endsWith('.md') ? pathname.replace(/\.md$/, '.html') : pathname
          const fileDaUrl = `${daUrl}${daPath}`
          aioLogger.debug(`UPLOADING TO ${fileDaUrl}`)
          fetchWithRetry(fileDaUrl, {
            method: 'PUT',
            body: formData
          }).then(() => resolve()).catch((error) => reject(error))
        })
        .catch((error) => {
          aioLogger.debug('Error fetching', contentFilePath, error)
          resolve(null) // return null instead of rejecting
        })
    })
  })

  const results = await Promise.all(promises)
  console.log(`✅ Uploaded ${results.filter(res => res !== null).length} content files.`)
}

/**
 * Returns the content file path for the file url. If the file url ends in /, then index.md is appended.
 * If the file  url ends in an extension, the extension is used.
 * Otherwise the last part of the path is used as the filename + .md
 *
 * @param {string} contentUrl url or path of the resource
 * @returns {string} the content file path, ending in .md, index.md, or .json
 */
function getContentFilePath (contentUrl) {
  if (contentUrl.endsWith('/')) {
    // page.com/nav/
    return `${contentUrl}index.md`
  } else if (hasExtension(contentUrl)) {
    // page.com/config.json
    return contentUrl
  } else {
    // page.com/nav
    return `${contentUrl}.md`
  }
}

/**
 * Checks if a file has a specific extension.
 *
 * @param {string} file - The file path or url to check.
 * @returns {boolean} True if the file has an extension, false otherwise.
 */
function hasExtension (file) {
  const lastPart = file.split('/').pop()
  return lastPart && lastPart.includes('.')
}
