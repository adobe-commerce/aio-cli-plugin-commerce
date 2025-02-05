import { runCommand } from './runCommand.js'
import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:github.js')

/**
 * Creates github repo from template
 */
export async function createRepo () {
  const { org: githubOrg, repo: githubRepo } = config.get('commerce.github')
  const { org: templateOrg, repo: templateRepo } = config.get('commerce.template')
  await runCommand(`gh repo create ${githubOrg}/${githubRepo} --template ${templateOrg}/${templateRepo} --public`)
  console.log(`✅ Created repo at https://github.com/${githubOrg}/${githubRepo} from template ${templateOrg}/${templateRepo}`)
}
/**
 * fstab must be connected to DA content source
 */
export async function modifyFstab () {
  const { org, repo } = config.get('commerce.github')
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

      // TODO: this will not work for templates using config-service since this, and other files, are deleted. Need to refactor this a bit to support
      const { stdout: FILE_SHA } = await runCommand(`gh api repos/${org}/${repo}/contents/fstab.yaml -q .sha`)
      await runCommand(`gh api -X PUT repos/${org}/${repo}/contents/fstab.yaml -f message="update fstab" -f content="${ENCODED_CONTENT.trim()}" -f sha="${FILE_SHA.trim()}"`)

      repoReady = true
      aioLogger.debug('fstab mountpoint updated')
    } catch (error) {
      aioLogger.error(`fstab mountpoint update attempt ${attempts} failed:`, error)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second
    }
  }
  if (!repoReady) throw new Error('Unable to modify fstab for some reason!')
}

/**
 * Sidekick requires specific config settings in github repo to have "edit" link back to DA
 */
export async function modifySidekickConfig () {
  const { org, repo } = config.get('commerce.github')
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
      aioLogger.debug('sidekick config modified with content source')
    } catch (error) {
      aioLogger.error(`sidekick config update attempt ${attempts} failed:`, error)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second
    }
  }
  if (!repoReady) throw new Error('Unable to modify sidekick config for some reason!')
}
