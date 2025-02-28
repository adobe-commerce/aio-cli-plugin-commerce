/**
 * This is a script to create multiple GitHub repositories using a template repository.
 * Only to be used for housekeeping purposes. Please do not run this script without supervision.
 */

import { createRepo } from '../utils/github.js'

const owner = 'adobe-summit-L322' // adobe-summit-L321
const repoPrefix = 'seat'
const templateOrg = 'adobe-commerce'
const templateRepo = 'adobe-demo-store'

async function createRepos (start, end) {
  console.log('Starting to create repos...')

  for (let i = start; i <= end; i++) {
    const repo = `${repoPrefix}-${i.toString().padStart(2, '0')}`
    try {
      await createRepo(owner, repo, templateOrg, templateRepo)
    } catch (e) {
      console.error(`! Failed to complete run for "${repo}". Skipping.`)
      console.error(e)
    }
  }
}

if (process.argv.length !== 4) {
  console.log('Usage: node createRepos.js <start> <end>')
} else {
  const start = parseInt(process.argv[2])
  const end = parseInt(process.argv[3])

  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    console.error('Start and End must be integers')
  } else if (start > end) {
    console.log('Start cannot be greater than End.')
  } else {
    createRepos(start, end).then(() => {
      console.log('All repos created successfully.')
    }).catch((error) => {
      console.error('Error creating repos:', error)
    })
  }
}
