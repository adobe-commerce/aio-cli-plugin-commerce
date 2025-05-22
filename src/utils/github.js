import { runCommand } from './runCommand.js'
import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
// import { promptConfirm } from './prompt.js'
const aioLogger = Logger('commerce:github.js')

/**
 * Creates github repo from template
 * @param githubOrg
 * @param githubRepo
 * @param templateOrg
 * @param templateRepo
 */
export async function createRepo (githubOrg, githubRepo, templateOrg, templateRepo) {
  console.log(`⏳ Attempting to create code repository at https://github.com/${githubOrg}/${githubRepo} from template ${templateOrg}/${templateRepo}`)

  try {
    // Check if the repository already exists
    try {
      const repoCheck = await runCommand(`gh api repos/${githubOrg}/${githubRepo}`)
      if (repoCheck?.stdout) {
        throw new Error(`Repository ${githubOrg}/${githubRepo} already exists. Please choose a different name.`)
      }
    } catch (error) {
      // If we get a 404, the repo doesn't exist which is what we want
      if (!error.message.includes('404')) {
        throw error
      }
    }

    // If we get here, we have access to the org and the repo doesn't exist
    await runCommand(`gh repo create ${githubOrg}/${githubRepo} --template ${templateOrg}/${templateRepo} --public`)

    // Wait for repo creation to complete, otherwise commits are out of order.
    await new Promise(resolve => {
      setTimeout(() => resolve(), 5000)
    })

    // Verify the repo was created successfully
    const verifyRepo = await runCommand(`gh api repos/${githubOrg}/${githubRepo}`)
    if (!verifyRepo?.stdout) {
      throw new Error(`Failed to create repository ${githubOrg}/${githubRepo}. Please try again.`)
    }

    console.log(`✅ Created code repository at https://github.com/${githubOrg}/${githubRepo} from template ${templateOrg}/${templateRepo}`)
    await modifyFstab(githubOrg, githubRepo, templateRepo)
    await modifySidekickConfig(githubOrg, githubRepo)
    await createLocalCommerceConfig(githubOrg, githubRepo, templateOrg, templateRepo)
  } catch (error) {
    console.error(`❌ ${error.message}`)
    throw error
  }
}

/**
 * Creates a local config.json based on the demo-config.json structure
 * @param githubOrg
 * @param githubRepo
 * @param templateOrg
 * @param templateRepo
 */
async function createLocalCommerceConfig (githubOrg, githubRepo, templateOrg, templateRepo) {
  const { saas, meshUrl } = config.get('commerce.datasource')

  const cfg = await fetch(`https://main--${templateRepo}--${templateOrg}.aem.live/config.json`).then(res => res.json())

  const coreEndpoint = meshUrl || saas || cfg.public.default['commerce-core-endpoint']
  const catalogEndpoint = meshUrl || saas || cfg.public.default['commerce-endpoint']
  const apiKey = config.get('commerce.apiKey') || cfg.public.default.headers.cs['x-api-key']
  const environmentId = config.get('commerce.environmentId') || cfg.public.default.headers.cs['Magento-Environment-Id']

  let repoReady = false
  let attempts = 0
  while (!repoReady && attempts++ <= 10) {
    aioLogger.debug('writing config.json, attempt #', attempts)
    try {
      const CONTENT = `{
  "public": {
    "default": {
      "commerce-core-endpoint": "${coreEndpoint}",
      "commerce-endpoint": "${catalogEndpoint}",
      "headers": {
        "cs": {
          "Magento-Customer-Group": "b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",
          "Magento-Store-Code": "main_website_store",
          "Magento-Store-View-Code": "default",
          "Magento-Website-Code": "base",
          "x-api-key": "${apiKey}",
          "Magento-Environment-Id": "${environmentId}"
        }
      },
      "analytics": {
        "base-currency-code": "USD",
        "environment": "Production",
        "store-id": 1,
        "store-name": "Main Website Store",
        "store-url": "https://main--${githubRepo}--${githubOrg}.aem.live/",
        "store-view-id": 1,
        "store-view-name": "Default Store View",
        "website-id": 1,
        "website-name": "Main Website"
      }
    }
  }
}
`
      aioLogger.debug(CONTENT)
      const ENCODED_CONTENT = Buffer.from(CONTENT, 'utf8').toString('base64')
      await runCommand(`gh api -X PUT repos/${githubOrg}/${githubRepo}/contents/config.json -f message="create local commerce config" -f content="${ENCODED_CONTENT.trim()}"`)

      repoReady = true
      aioLogger.debug('commerce local config created')
    } catch (error) {
      aioLogger.debug(`commerce local config update attempt ${attempts} failed:`, error)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second
    }
  }
  if (!repoReady) throw new Error('Unable to create commerce local config for some reason - retry with AIO_LOG_LEVEL=debug for more information.')
}

/**
 * fstab must be connected to DA content source
 * @param githubOrg
 * @param githubRepo
 * @param templateRepo
 */
async function modifyFstab (githubOrg, githubRepo, templateRepo) {
  let repoReady = false
  let attempts = 0
  // TODO: adobe-demo-store uses folder mapping for categories so need to add conditional. Long view, should not matter
  // if using config service, or if we can update to only modify the root mountpoint and copy "folders:" in full from source fstab.
  const standardFstab = `mountpoints:
  /:
    url: https://content.da.live/${githubOrg}/${githubRepo}/
    type: markup

folders:
  /products/: /products/default
`
  const adobeStoreFstab = `mountpoints:
  /:
    url: https://content.da.live/${githubOrg}/${githubRepo}/
    type: markup

folders:
  /products/: /products/default
  /apparel: /categories/default
  /office: /categories/default
  /lifestyle: /categories/default
  /bags: /categories/default
  /collections: /categories/default
`
  const fstab = templateRepo === 'adobe-demo-store' ? adobeStoreFstab : standardFstab
  const ENCODED_CONTENT = Buffer.from(fstab, 'utf8').toString('base64')
  let FILE_SHA
  try {
    const { stdout } = await runCommand(`gh api repos/${githubOrg}/${githubRepo}/contents/fstab.yaml -q .sha`)
    FILE_SHA = stdout
  } catch (e) {
    aioLogger.debug(e)
    aioLogger.debug('No sidekick/config.json found in repo - will create')
  }

  while (!repoReady && attempts++ <= 10) {
    aioLogger.debug('writing fstab.yaml, attempt #', attempts)
    try {
      // hlx4 repos will have fstab, so we need to modify
      if (FILE_SHA) {
        await runCommand(`gh api -X PUT repos/${githubOrg}/${githubRepo}/contents/fstab.yaml -f message="update fstab" -f content="${ENCODED_CONTENT.trim()}" -f sha="${FILE_SHA.trim()}"`)
      } else {
        await runCommand(`gh api -X PUT repos/${githubOrg}/${githubRepo}/contents/fstab.yaml -f message="create fstab" -f content="${ENCODED_CONTENT.trim()}"`)
      }

      repoReady = true
      aioLogger.debug('fstab mountpoint updated')
    } catch (error) {
      aioLogger.debug(`fstab mountpoint update attempt ${attempts} failed:`, error)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second
    }
  }
  if (!repoReady) throw new Error('Unable to modify fstab for some reason - retry with AIO_LOG_LEVEL=debug for more information.')
}

/**
 * Sidekick requires specific config settings in github repo to have "edit" link back to DA
 * @param githubOrg
 * @param githubRepo
 */
async function modifySidekickConfig (githubOrg, githubRepo) {
  let repoReady = false
  let attempts = 0
  const ENCODED_CONTENT = Buffer.from(`{
    "project": "Boilerplate",
    "editUrlLabel": "Document Authoring",
    "editUrlPattern": "https://da.live/edit#/{{org}}/{{site}}{{pathname}}",
    "plugins": [
        {
            "id": "cif",
            "title": "Commerce",
            "environments": [
                "edit"
            ],
            "url": "https://main--${githubRepo}--${githubOrg}.aem.live/tools/picker/dist/index.html",
            "isPalette": true,
            "paletteRect": "top: 54px; left: 5px; bottom: 5px; width: 300px; height: calc(100% - 59px); border-radius: var(--hlx-sk-button-border-radius); overflow: hidden; resize: horizontal;"
        }
    ]
}
`, 'utf8').toString('base64')

  let FILE_SHA
  try {
    const { stdout } = await runCommand(`gh api repos/${githubOrg}/${githubRepo}/contents/tools/sidekick/config.json -q .sha`)
    FILE_SHA = stdout
  } catch (e) {
    aioLogger.debug(e)
    aioLogger.debug('No sidekick/config.json found in repo - will create')
  }

  while (!repoReady && attempts++ <= 10) {
    aioLogger.debug('writing tools/sidekick/config.json, attempt #', attempts)
    try {
      if (FILE_SHA) {
        await runCommand(`gh api -X PUT repos/${githubOrg}/${githubRepo}/contents/tools/sidekick/config.json -f message="update sidekick config" -f content="${ENCODED_CONTENT.trim()}" -f sha="${FILE_SHA.trim()}"`)
      } else {
        await runCommand(`gh api -X PUT repos/${githubOrg}/${githubRepo}/contents/tools/sidekick/config.json -f message="create sidekick config" -f content="${ENCODED_CONTENT.trim()}"`)
      }
      repoReady = true
      aioLogger.debug('sidekick config modified with content source')
    } catch (error) {
      aioLogger.debug(`sidekick config update attempt ${attempts} failed:`, error)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second
    }
  }
  if (!repoReady) throw new Error('Unable to modify sidekick config for some reason - retry with AIO_LOG_LEVEL=debug for more information.')
}

/**
 * fetches a url once a second, until res.status is 200. On average seems to take
 * around 30 seconds.
 * @param org
 * @param repo
 */
export async function codeSyncComplete (org, repo) {
  const retries = 100
  const delayMs = 1000
  let attempts = 0
  const resourceUrl = `https://main--${repo}--${org}.aem.page/scripts/scripts.js`
  aioLogger.debug(`Checking code resource is uploaded at ${resourceUrl}`)
  while (attempts < retries) {
    try {
      const res = await fetch(resourceUrl)
      if (res.status === 200) return
      throw new Error('Failed to fetch script')
    } catch (error) {
      attempts++
      await new Promise(resolve => setTimeout(resolve, delayMs))
    }
  }
  throw new Error(`Failed to confirm code resource sync after ${delayMs / 1000 * retries} seconds.`)
}
