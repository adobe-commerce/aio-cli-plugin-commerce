/**
 * This script deletes all the repositories created by the create-repos.js script.
 * Only to be used for housekeeping purposes. Please do not run this script without supervision.
 *
 * Usage: node deleteRepos.js <destination> <start> <end>
 * Example: node deleteRepos.js adobe-summit-L322/seat 0 100
 */

import childProcess from 'child_process'

function parseDestinationString (destString) {
  const [org, prefix] = destString.split('/')
  return { org, prefix }
}

function runCommand (cmd) {
  return new Promise((resolve, reject) => {
    childProcess.exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr)
        resolve(false)
      } else {
        console.log(stdout)
        resolve(true)
      }
    })
  })
}

function deleteRepos (destination, start, end) {
  console.log('Starting to delete repos...')
  console.log(`Destination: ${destination}`)

  const { org: destOrg, prefix: repoPrefix } = parseDestinationString(destination)

  for (let seat = start; seat <= end; seat++) {
    const repoName = `${destOrg}/${repoPrefix}-${seat.toString().padStart(2, '0')}`
    const command = `gh api \
                      --method DELETE \
                      -H "Accept: application/vnd.github+json" \
                      -H "X-GitHub-Api-Version: 2022-11-28" \
                      /repos/${repoName}`

    runCommand(command)
      .then((success) => {
        if (success) {
          console.log(`Repo at ${repoName} deleted successfully`)
        } else {
          console.error(`Failed to delete repo at ${repoName}`)
        }
      })
      .catch((error) => {
        console.error(`Error occurred while running command for ${repoName}: ${error}`)
      })
  }
}

if (process.argv.length !== 5) {
  console.log('Usage: node deleteRepos.js <destination> <start> <end>')
  console.log('Example: node deleteRepos.js adobe-summit-L322/seat 0 100')
} else {
  const destination = process.argv[2]
  const start = parseInt(process.argv[3])
  const end = parseInt(process.argv[4])

  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    console.error('Start and End must be integers')
  } else if (start > end) {
    console.log('Start cannot be greater than End.')
  } else {
    deleteRepos(destination, start, end)
  }
}
