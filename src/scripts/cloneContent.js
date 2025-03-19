/**
 * This is a script to clone content automatically.
 * Only to be used for housekeeping purposes. Please do not run this script without supervision.
 *
 * Usage: node cloneContent.js <source> <destination> <start> <end>
 * Example: node cloneContent.js adobe-commerce/adobe-demo-store adobe-summit-L322/seat 0 100
 */

import { execSync } from 'child_process'

function parseRepoString (repoString) {
  const [org, repo] = repoString.split('/')
  return { org, repo }
}

function parseDestinationString (destString) {
  const [org, prefix] = destString.split('/')
  return { org, prefix }
}

async function cloneContent (source, destination, start, end) {
  console.log('Starting to clone content...')
  console.log(`Source: ${source}`)
  console.log(`Destination: ${destination}`)

  const { org: sourceOrg, repo: sourceRepo } = parseRepoString(source)
  const { org: destOrg, prefix: repoPrefix } = parseDestinationString(destination)

  for (let i = start; i <= end; i++) {
    const repoNumber = i.toString().padStart(2, '0')
    const command = `aio commerce:init --template "${sourceOrg}/${sourceRepo}" --repo "${destOrg}/${repoPrefix}-${repoNumber}" --datasource "" --skipMesh --skipGit`
    console.log(`\nExecuting command ${i} of ${end}:`)
    console.log(command)

    try {
      execSync(command, { stdio: 'inherit' })
      console.log(`Successfully completed iteration ${i}`)
    } catch (error) {
      console.error(`Error in iteration ${i}:`, error.message)
      throw error
    }
  }
}

if (process.argv.length !== 6) {
  console.log('Usage: node cloneContent.js <source> <destination> <start> <end>')
  console.log('Example: node cloneContent.js adobe-commerce/adobe-demo-store adobe-summit-L322/seat 0 100')
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
    cloneContent(source, destination, start, end).then(() => {
      console.log('All repos created successfully.')
    }).catch((error) => {
      console.error('Error creating repos:', error)
    })
  }
}
