/**
 * This script is designed to check the status of code syncs for a series of repositories.
 * Only to be used for housekeeping purposes. Please do not run this script without supervision.
 */

import fs from 'fs'

const PROGRESS_FILE = 'progress.json'
const POST_URL = 'https://admin.hlx.page/code/adobe-summit-L322/seat-##/main/*'
const TOTAL_REPOS = 100
const WAIT_TIME_MS = 1 * 60 * 60 * 1000 // 1 hour
// the amount of git files we expect the code sync to have to have processed.
// for L322, it seems to be 418. For L321, seems around 411.
const GIT_FILES_TO_CHECK = 418

/**
 * Pads the index to two digits (01, 02, ..., 99)
 * @param {number} index
 * @returns {string} Padded index
 */
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

async function checkRepo (index) {
  try {
    await triggerCodeSync(index)
    console.log(`✅ Code sync completed for seat-${padIndex(index)}. Proceeding to the next repo.`)
    return index + 1 // Move to the next repo
  } catch (error) {
    console.error(`🚨 Error during code sync for seat-${padIndex(index)}:`, error)
    return index - 1 // Restart from the previous repo
  }
}

async function saveAndExit (index) {
  // Determine restart time in CST
  const restartTimestamp = Date.now() + WAIT_TIME_MS
  const restartTime = new Date(restartTimestamp).toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour12: true })

  console.log(`🚨 Script exiting. Restart at seat-${padIndex(index)} after ~1 hour at: ${restartTime} CST`)

  saveProgress(index, restartTimestamp)
  process.exit(1)
}

async function triggerCodeSync (seat) {
  const postUrl = POST_URL.replace('##', padIndex(seat))
  console.log(`🔄 Calling Helix Admin Code Sync at: ${postUrl}`)

  try {
    const postResponse = await fetch(postUrl, { method: 'POST' })

    if (postResponse.status !== 202) {
      console.error(`No code found for seat-${padIndex(seat)}. Ensure repo exists.`)
      saveAndExit(seat)
      process.exit(1)
    }
    const postData = await postResponse.json()
    const detailsUrl = `${postData.links.self}/details`
    console.log(`🔍 Checking details at: ${detailsUrl}`)

    await checkPhaseCompletion(detailsUrl, seat)
  } catch (error) {
    console.error(`Error processing seat-${padIndex(seat)}:`, error)
    throw error
  }
}

async function checkPhaseCompletion (detailsUrl, seat, maxRetries = 60, interval = 1000) {
  let attempts = 0

  while (attempts < maxRetries) {
    try {
      const detailsResponse = await fetch(detailsUrl)
      const detailsData = await detailsResponse.json()
      if (detailsData.state === 'stopped') {
        if (detailsData.progress && detailsData?.progress.processed >= GIT_FILES_TO_CHECK) {
          console.log(`✅ Seat-${padIndex(seat)} processing completed.`)
          return
        } else if (detailsData.error.includes('rate limit exceeded')) {
          console.log(`⚠️ Seat-${padIndex(seat)} processing rate limit exceeded.`)
          saveAndExit(seat)
        } else {
          console.log('Unknown state! Data:', detailsData)
          saveAndExit(seat)
        }
      } else {
        console.log(`⏳ Seat-${padIndex(seat)} still processing... retrying (${attempts + 1}/${maxRetries}) in ${(interval / 1000)}s.`)
      }
    } catch (error) {
      console.error(`Error fetching details for seat-${padIndex(seat)}:`, error)
    }

    attempts++
    await new Promise(resolve => setTimeout(resolve, interval)) // Wait 1s before retrying
  }

  await saveAndExit(seat)
}

async function runChecks () {
  const { lastChecked, restartAfter } = loadProgress()

  // Check if we are running before the allowed restart time
  if (Date.now() < restartAfter) {
    const restartTime = new Date(restartAfter).toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour12: true })
    console.error(`❌ Cannot start yet. Please wait until: ${restartTime} CST.`)
    process.exit(1)
  }

  let index = lastChecked
  while (index <= TOTAL_REPOS) {
    index = await checkRepo(index)
    if (index < 1) index = 1 // Prevent negative index
    saveProgress(index)
  }
  console.log('✅ All repos checked successfully.')
}

// Start process
runChecks()
