/**
 * This is a script to clone content automatically.
 * Only to be used for housekeeping purposes. Please do not run this script without supervision.
 */
import { execSync } from 'child_process'

const owner = 'adobe-summit-L321'
const templateRepo = 'ccdm-demo-store'
// const owner = 'adobe-summit-L322'
// const templateRepo = 'adobe-demo-store'
const repoPrefix = 'seat'
const templateOrg = 'adobe-commerce'

async function cloneContent (start, end) {
  console.log('Starting to clone content...')

  for (let i = start; i <= end; i++) {
    const repoNumber = i.toString().padStart(2, '0')
    const command = `aio commerce:init --template "${templateOrg}/${templateRepo}" --repo "${owner}/${repoPrefix}-${repoNumber}" --datasource "" --skipMesh --skipGit`
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

if (process.argv.length !== 4) {
  console.log('Usage: node cloneContent.js <start> <end>')
} else {
  const start = parseInt(process.argv[2])
  const end = parseInt(process.argv[3])

  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    console.error('Start and End must be integers')
  } else if (start > end) {
    console.log('Start cannot be greater than End.')
  } else {
    cloneContent(start, end).then(() => {
      console.log('All repos created successfully.')
    }).catch((error) => {
      console.error('Error creating repos:', error)
    })
  }
}
