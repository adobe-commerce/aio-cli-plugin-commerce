import { org, repo } from './constants.js'
import { runCommand } from './runCommand.js'
/**
 *
 * @param url
 */
export async function uploadStarterContent () {
  const filePaths = await getFilePathsFromAem()
  await uploadFilesToDA(filePaths)
}

/**
 * https://www.aem.live/docs/admin.html#tag/status/operation/bulkStatus
 */
async function getBulkStatusUrl () {
  const { stdout: response } = await runCommand('curl --data \'{ "paths": ["/*"] }\' --header "Content-Type: application/json" \'https://admin.hlx.page/status/hlxsites/aem-boilerplate-commerce/main/*\'')
  return JSON.parse(response).links.self + '/details'
}

/**
 *
 */
async function getFilePathsFromAem () {
  const maxTry = 3
  let tryCount = 1
  const bulkStatusUrl = await getBulkStatusUrl()
  console.log(`Getting paths from ${bulkStatusUrl}`)
  while (tryCount <= maxTry) {
    console.log(`Attempt ${tryCount}...`)
    try {
      const response = await fetch(bulkStatusUrl)
      if (response.ok) {
        const data = await response.json()
        if (data.state === 'stopped') {
          return data.data.resources
            .filter(resource => !resource.path.startsWith('/draft') && !resource.path.startsWith('/helix-env.json'))
            // TODO: change to `main` or `aemshop.net` once GA
            .map(resource => `https://develop--aem-boilerplate-commerce--hlxsites.aem.live/${resource.path.replace(/^\/+/, '')}`)
        } else {
          tryCount++
          await new Promise(resolve => setTimeout(resolve, 5000))
        }
      } else {
        console.error('Failed to fetch data:', response)
        break
      }
    } catch (error) {
      console.error(error)
      tryCount++
      if (tryCount < maxTry) {
        await new Promise(resolve => setTimeout(resolve, 5000))
      } else {
        console.error('Max tries exceeded')
        break
      }
    }
  }

  return []
}

/**
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
  const content = text
  if (ext !== 'json') {
    // TODO: generate blob content properly.
    // https://github.com/da-sites/nexter/blob/main/nx/utils/daFetch.js#L77
    // https://github.com/da-sites/nexter/blob/d1c9efffc5af0092d91aa360e6113900bbb7854c/nx/blocks/importer/index.js#L44-L48
    // content = getAemHtml();
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
  const daUrl = `https://admin.da.live/source/${org}/${repo}`

  const promises = files.map((file) => {
    const contentFilePath = getContentFilePath(file)
    console.log(`fetching ${contentFilePath}`)
    return new Promise((resolve, reject) => {
      fetch(contentFilePath)
        .then(async (resp) => {
          if (!resp.ok) throw Error('Unable to fetch file')
          const text = await resp.text()
          const { pathname: daPath } = new URL(contentFilePath)
          const blob = getBlob(text, daPath)
          const formData = new FormData()
          formData.append('data', blob)
          const fileDaUrl = `${daUrl}${daPath}`
          console.log(`uploading to ${fileDaUrl}`)
          fetch(fileDaUrl, {
            method: 'PUT',
            body: formData
          }).then(() => resolve()).catch((error) => reject(error))
        })
        .catch((error) => {
          console.error('Error fetching', file, error)
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
