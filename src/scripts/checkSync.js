/**
 * This script is designed to check the status of code syncs for a series of repositories.
 * Only to be used for housekeeping purposes. Please do not run this script without supervision.
 *
 * Usage: node checkSync.js <destination> <start> <end>
 * Example: node checkSync.js adobe-summit-L322/seat 0 100
 */

import fs from 'fs'

const PROGRESS_FILE = 'progress.json'
const WAIT_TIME_MS = 1 * 60 * 60 * 1000 // 1 hour
// the amount of git files we expect the code sync to have to have processed.
// for L322, it seems to be 418. For L321, seems to be 412.
const GIT_FILES_TO_CHECK = 412

function parseDestinationString (destString) {
  const [org, prefix] = destString.split('/')
  return { org, prefix }
}

function padIndex (index) {
  return index.toString().padStart(2, '0')
}

function loadProgress () {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      const data = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'))
      return {
        lastChecked: data.lastChecked === 0 ? 0 : data.lastChecked || 1,
        restartAfter: data.restartAfter || 0
      }
    }
  } catch (error) {
    console.error('Error loading progress:', error)
  }
  return { lastChecked: 1, restartAfter: 0 } // Default values
}

function saveProgress (index, restartAfter = 0) {
  try {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ lastChecked: index, restartAfter }))
  } catch (error) {
    console.error('Error saving progress:', error)
  }
}

async function checkRepo (destination, index) {
  try {
    await triggerCodeSync(destination, index)
    console.log(`✅ Code sync completed for ${destination}-${padIndex(index)}. Proceeding to the next repo.`)
    return index + 1 // Move to the next repo
  } catch (error) {
    console.error(`🚨 Error during code sync for ${destination}-${padIndex(index)}:`, error)
    return index - 1 // Restart from the previous repo
  }
}

async function saveAndExit (destination, index) {
  // Determine restart time in CST
  const restartTimestamp = Date.now() + WAIT_TIME_MS
  const restartTime = new Date(restartTimestamp).toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour12: true })
  console.log(`🚨 Script exiting. Restart at ${destination}-${padIndex(index)} after ~1 hour at: ${restartTime} CST`)

  saveProgress(index, restartTimestamp)
  process.exit(0)
}

async function triggerCodeSync (destination, seat) {
  const { org, prefix } = parseDestinationString(destination)
  const postUrl = `https://admin.hlx.page/code/${org}/${prefix}-${padIndex(seat)}/main/*`
  console.log(`🔄 Calling Helix Admin Code Sync at: ${postUrl}`)

  try {
    const postResponse = await fetch(postUrl, { method: 'POST' })

    if (postResponse.status !== 202) {
      console.error(`No code found for ${destination}-${padIndex(seat)}. Ensure repo exists.`)
      saveAndExit(destination, seat)
    }
    const postData = await postResponse.json()
    const detailsUrl = `${postData.links.self}/details`
    console.log(`🔍 Checking details at: ${detailsUrl}`)

    await checkPhaseCompletion(detailsUrl, destination, seat)
  } catch (error) {
    console.error(`Error processing ${destination}-${padIndex(seat)}:`, error)
    throw error
  }
}

async function checkPhaseCompletion (detailsUrl, destination, seat, maxRetries = 60, interval = 5000) {
  let attempts = 0

  while (attempts < maxRetries) {
    try {
      const detailsResponse = await fetch(detailsUrl)
      const detailsData = await detailsResponse.json()
      if (detailsData.state === 'stopped') {
        if (detailsData.progress && detailsData?.progress.processed >= GIT_FILES_TO_CHECK) {
          console.log(`✅ ${destination}-${padIndex(seat)} processing completed.`)
          return
        } else if (detailsData.error.includes('rate limit exceeded')) {
          console.log(`⚠️ ${destination}-${padIndex(seat)} processing rate limit exceeded.`)
          saveAndExit(destination, seat)
        } else {
          console.log('Unknown state! Data:', detailsData)
          saveAndExit(destination, seat)
        }
      } else {
        console.log(`⏳ ${destination}-${padIndex(seat)} still processing... retrying (${attempts + 1}/${maxRetries}) in ${(interval / 1000)}s.`)
      }
    } catch (error) {
      console.error(`Error fetching details for ${destination}-${padIndex(seat)}:`, error)
    }

    attempts++
    await new Promise(resolve => setTimeout(resolve, interval)) // Wait 1s before retrying
  }

  await saveAndExit(destination, seat)
}

async function runChecks (destination, start, end) {
  const { lastChecked, restartAfter } = loadProgress()

  // Check if we are running before the allowed restart time
  if (Date.now() < restartAfter) {
    const restartTime = new Date(restartAfter).toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour12: true })
    console.error(`❌ Cannot start yet. Please wait until: ${restartTime} CST.`)
    process.exit(1)
  }

  let index = lastChecked
  while (index <= end) {
    index = await checkRepo(destination, index)
    if (index < start) index = start // Prevent going below start
    saveProgress(index)
  }
  console.log('✅ All repos checked successfully.')
}

if (process.argv.length !== 5) {
  console.log('Usage: node checkSync.js <destination> <start> <end>')
  console.log('Example: node checkSync.js adobe-summit-L322/seat 0 100')
} else {
  const destination = process.argv[2]
  const start = parseInt(process.argv[3])
  const end = parseInt(process.argv[4])

  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    console.error('Start and End must be integers')
  } else if (start > end) {
    console.log('Start cannot be greater than End.')
  } else {
    runChecks(destination, start, end)
  }
}
