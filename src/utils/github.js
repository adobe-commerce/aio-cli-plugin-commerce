import { runCommand } from './runCommand.js'
import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:github.js')

/**
 * fstab must be connected to DA content source
 */
export async function modifyFstab () {
  const { org, repo } = config.get('github')
  let repoReady = false
  let attempts = 0
  while (!repoReady && attempts++ <= 10) {
    aioLogger.debug('writing fstab.yaml, attempt #', attempts)
    try {
      const ENCODED_CONTENT = Buffer.from(`mountpoints:
/:
  url: https://content.da.live/${org}/${repo}/
  type: markup

folders:
/products/: /products/default
`, 'utf8').toString('base64')

      const { stdout: FILE_SHA } = await runCommand(`gh api repos/${org}/${repo}/contents/fstab.yaml -q .sha`)
      await runCommand(`gh api -X PUT repos/${org}/${repo}/contents/fstab.yaml -f message="update fstab" -f content="${ENCODED_CONTENT.trim()}" -f sha="${FILE_SHA.trim()}"`)

      repoReady = true
      aioLogger.log('Repo ready!')
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second
    }
  }
  if (!repoReady) throw new Error('Unable to modify fstab for some reason!')
}

/**
 * Sidekick requires specific config settings in github repo to have "edit" link back to DA
 */
export async function modifySidekick () {
  const { org, repo } = config.get('github')
  let repoReady = false
  let attempts = 0
  while (!repoReady && attempts++ <= 10) {
    aioLogger.debug('writing tools/sidekick/config.json, attempt #', attempts)
    try {
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
            "url": "https://main--${repo}--${org}.aem.live/tools/picker/dist/index.html",
            "isPalette": true,
            "paletteRect": "top: 54px; left: 5px; bottom: 5px; width: 300px; height: calc(100% - 59px); border-radius: var(--hlx-sk-button-border-radius); overflow: hidden; resize: horizontal;"
        }
    ]
}
`, 'utf8').toString('base64')

      const { stdout: FILE_SHA } = await runCommand(`gh api repos/${org}/${repo}/contents/tools/sidekick/config.json -q .sha`)
      await runCommand(`gh api -X PUT repos/${org}/${repo}/contents/tools/sidekick/config.json -f message="update sidekick config" -f content="${ENCODED_CONTENT.trim()}" -f sha="${FILE_SHA.trim()}"`)

      repoReady = true
      aioLogger.log('Repo ready!')
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second
    }
  }
  if (!repoReady) throw new Error('Unable to modify fstab for some reason!')
}
