/**
 * This is a script to create multiple GitHub repositories using a template repository.
 * Only to be used for housekeeping purposes. Please do not run this script without supervision.
 *
 * Usage: node createRepos.js <source> <destination> <start> <end>
 * Example: node createRepos.js adobe-commerce/adobe-demo-store adobe-summit-L322/seat 0 100
 */

import { createRepo } from '../utils/github.js'

function parseRepoString (repoString) {
  const [org, repo] = repoString.split('/')
  return { org, repo }
}

function parseDestinationString (destString) {
  const [org, prefix] = destString.split('/')
  return { org, prefix }
}

async function createRepos (source, destination, start, end) {
  console.log('Starting to create repos...')
  console.log(`Source: ${source}`)
  console.log(`Destination: ${destination}`)

  const { org: sourceOrg, repo: sourceRepo } = parseRepoString(source)
  const { org: destOrg, prefix: repoPrefix } = parseDestinationString(destination)

  for (let i = start; i <= end; i++) {
    const repo = `${repoPrefix}-${i.toString().padStart(2, '0')}`
    try {
      await createRepo(destOrg, repo, sourceOrg, sourceRepo)
    } catch (e) {
      console.error(`! Failed to complete run for "${repo}". Skipping.`)
      console.error(e)
    }
  }
}

if (process.argv.length !== 6) {
  console.log('Usage: node createRepos.js <source> <destination> <start> <end>')
  console.log('Example: node createRepos.js adobe-commerce/adobe-demo-store adobe-summit-L322/seat 0 100')
} else {
  const source = process.argv[2]
  const destination = process.argv[3]
  const start = parseInt(process.argv[4])
  const end = parseInt(process.argv[5])

  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    console.error('Start and End must be integers')
  } else if (start > end) {
    console.log('Start cannot be greater than End.')
  } else {
    createRepos(source, destination, start, end).then(() => {
      console.log('All repos created successfully.')
    }).catch((error) => {
      console.error('Error creating repos:', error)
    })
  }
}
