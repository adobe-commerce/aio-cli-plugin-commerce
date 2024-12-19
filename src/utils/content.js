import { getAemHtml } from './importer.js'
import { modifyConfig } from './configs.js'
import { runCommand } from './runCommand.js'
import { fetchWithRetry } from './fetchWithRetry.js'
import Logger from '@adobe/aio-lib-core-logging'
import config from '@adobe/aio-lib-core-config'
const aioLogger = Logger('commerce:scaffold:content.js')

/**
 * Gets source url file paths from the Helix Admin API for the template org and
 * repo. Then each source file is transformed into expected upload file type and
 * uploaded to content repository destination.
 *
 * @param url
 */
export async function uploadStarterContent () {
  aioLogger.log('⏳ Cloning content from boilerplate')
  const filePaths = await getFilePathsFromAem()
  aioLogger.log('⏳ Uploading content to document authoring space.')
  await uploadFilesToDA(filePaths)
  aioLogger.log(`✅ Uploaded ${filePaths.length} content files.`)
  return filePaths
}

/**
 * https://www.aem.live/docs/admin.html#tag/status/operation/bulkStatus
 */
async function getBulkStatusUrl () {
  const templateOrg = config.get('commerce.template.org')
  const templateRepo = config.get('commerce.template.repo')
  const { stdout: response } = await runCommand(`curl --data '{ "paths": ["/*"] }' --header "Content-Type: application/json" 'https://admin.hlx.page/status/${templateOrg}/${templateRepo}/main/*'`)
  return JSON.parse(response).links.self + '/details'
}

/**
 *
 */
async function getFilePathsFromAem () {
  const templateOrg = config.get('commerce.template.org')
  const templateRepo = config.get('commerce.template.repo')
  const maxTry = 3
  let tryCount = 1
  const bulkStatusUrl = await getBulkStatusUrl()
  aioLogger.debug(`Getting paths from ${bulkStatusUrl}`)
  // Since bulkStatus is async, it may not be complete when we fetch, so we need to retry until state is "stopped"
  while (tryCount <= maxTry) {
    aioLogger.debug(`Attempt ${tryCount}...`)
    try {
      const response = await fetch(bulkStatusUrl)
      if (response.ok) {
        const data = await response.json()
        if (data.state === 'stopped') {
          return data.data.resources
            .filter(resource => !resource.path.startsWith('/draft') && !resource.path.startsWith('/helix-env.json') && !resource.path.startsWith('/sitemap-content.xml'))
            .map(resource => {
              if (templateRepo === 'citisignal-one') {
                // Citisignal template has not published all files, thus we have to use preview urls for content source
                return `https://main--${templateRepo}--${templateOrg}.aem.page/${resource.path.replace(/^\/+/, '')}`
              } else {
                // should be able to use published for all others
                return `https://main--${templateRepo}--${templateOrg}.aem.live/${resource.path.replace(/^\/+/, '')}`
              }
            })
        } else {
          tryCount++
          await new Promise(resolve => setTimeout(resolve, 5000))
        }
      } else {
        aioLogger.error('Failed to fetch data:', response)
        break
      }
    } catch (error) {
      aioLogger.error(error)
      tryCount++
      if (tryCount < maxTry) {
        await new Promise(resolve => setTimeout(resolve, 5000))
      } else {
        aioLogger.error('Max tries exceeded')
        break
      }
    }
  }

  return []
}

/**
 * Given text content and a file path/extension, convert the object to the necessary
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
  } else if (['/configs.json', '/configs-stage.json', '/configs-dev.json'].includes(pathname)) {
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
  const { github: { org, repo } } = config.get()
  if (!org || !repo) throw new Error('Missing Github Org and Repo')
  const daUrl = `https://admin.da.live/source/${org}/${repo}`

  const promises = files.map((file) => {
    const contentFilePath = getContentFilePath(file)
    aioLogger.debug(`FETCHING ${contentFilePath}`)
    return new Promise((resolve, reject) => {
      fetch(contentFilePath)
        .then(async (resp) => {
          if (!resp.ok) throw Error('Unable to fetch file')
          const text = await resp.text()
          const { pathname } = new URL(contentFilePath)
          const blob = await getBlob(text, pathname)
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
          aioLogger.error('Error fetching', file, error)
          resolve(null) // return null instead of rejecting
        })
    })
  })

  await Promise.all(promises)
}

/**
 * Returns the content file path for the file url. If the file url ends in /, then index.md is appended.
 * If the file  url ends in an extension, the extension is used.
 * Otherwise the last part of the path is used as the filename + .md
 *
 * @param {string} contentUrl url representation of the resource, from Helix bulkStatus API
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
 * @param {string} file - The file URL or name to check.
 * @returns {boolean} True if the file has an extension, false otherwise.
 */
function hasExtension (file) {
  // Remove leading slashes and split into parts
  const urlParts = file.replace(/^\/+|\/+$/g, '').split('/')

  // If there's no extension in the URL, return false
  if (urlParts.length < 2 || !urlParts[urlParts.length - 1].includes('.')) {
    return false
  }

  // Get the last part with the extension
  const extension = urlParts[urlParts.length - 1]

  // Return true if the extension is not empty
  return extension !== '' && extension.includes('.')
}
