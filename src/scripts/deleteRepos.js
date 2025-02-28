/**
 * This script deletes all the repositories created by the create-repos.js script.
 * Only to be used for housekeeping purposes. Please do not run this script without supervision.
 */

import childProcess from 'child_process'

/**
 *
 * @param cmd
 */
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

/**
 *
 * @param start
 * @param end
 */
function deleteRepos (start, end) {
  for (let seat = start; seat <= end; seat++) {
    const repoName = `adobe-summit-L322/seat-${seat.toString().padStart(2, '0')}`
    const command = `gh api \
                      --method DELETE \
                      -H "Accept: application/vnd.github+json" \
                      -H "X-GitHub-Api-Version: 2022-11-28" \
                      /repos/${repoName}`

    runCommand(command)
      .then((success) => {
        if (success) {
          console.log(`Repo at seat-${seat} deleted successfully`)
        } else {
          console.error(`Failed to delete repo at seat-${seat}`)
        }
      })
      .catch((error) => {
        console.error(`Error occurred while running command for seat-${seat}: ${error}`)
      })
  }
}

if (process.argv.length !== 4) {
  console.log('Usage: node deleteRepos.js <start> <end>')
} else {
  const start = parseInt(process.argv[2])
  const end = parseInt(process.argv[3])

  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    console.error('Start and End must be integers')
  } else if (start > end) {
    console.log('Start cannot be greater than End.')
  } else {
    deleteRepos(start, end)
  }
}
