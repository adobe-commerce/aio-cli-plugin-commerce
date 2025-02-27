/**
 * This is a script to create multiple GitHub repositories using a template repository.
 * Only to be used for housekeeping purposes. Please do not run this script without supervision.
 */

import { createRepo } from '../utils/github.js'

const start = 1
const end = 100
const owner = 'adobe-summit-L322' // adobe-summit-L321
const repoPrefix = 'seat'
const templateOrg = 'adobe-commerce'
const templateRepo = 'adobe-demo-store'

/**
 *
 */
async function createRepos () {
  console.log('Starting to create repos...')

  for (let i = start; i <= end; i++) {
    const repo = `${repoPrefix}-${i}`
    try {
      await createRepo(owner, repo, templateOrg, templateRepo)
    } catch (e) {
      console.error(`! Failed to complete run for "${repo}". Skipping.`)
      console.error(e)
    }
  }
}

createRepos().then(() => {
  console.log('All repos created successfully.')
}).catch((error) => {
  console.error('Error creating repos:', error)
})
