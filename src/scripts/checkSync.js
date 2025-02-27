import fs from 'fs'

const PROGRESS_FILE = 'progress.json'
const BASE_URL = 'https://main--seat-#--adobe-summit-l322.aem.page/scripts/scripts.js'
const POST_URL = 'https://admin.hlx.page/code/adobe-summit-L322/seat-#/main/*'
const TOTAL_REPOS = 100
const WAIT_TIME_MS = 1 * 60 * 60 * 1000 // 1 hour
// the amount of git files we expect the code sync to have to have processed.
// for L322, it seems to be 418. For L321, seems around 411.
const GIT_FILES_TO_CHECK = 418

/**
 *
 */
function loadProgress () {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      const data = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'))
      return {
        lastChecked: data.lastChecked || 1,
        restartAfter: data.restartAfter || 0
      }
    }
  } catch (error) {
    console.error('Error loading progress:', error)
  }
  return { lastChecked: 1, restartAfter: 0 } // Default values
}

// Save progress to file
/**
 *
 * @param index
 * @param restartAfter
 */
function saveProgress (index, restartAfter = 0) {
  try {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ lastChecked: index, restartAfter }))
  } catch (error) {
    console.error('Error saving progress:', error)
  }
}

/**
 * Checks that the code sync for a specific seat is complete.
 * If not, it triggers the code sync and waits until it's done.
 * @param index The index of the seat to check.
 */
async function checkRepo (index) {
  try {
    await triggerCodeSync(index)
    console.log(`✅ Code sync completed for seat-${index}. Proceeding to the next repo.`)
    return index + 1 // Move to the next repo
  } catch (error) {
    console.error(`🚨 Error during code sync for seat-${index}:`, error)
    return index - 1 // Restart from the previous repo
  }
}

/**
 *
 * @param index
 */
async function saveAndExit (index) {
  // Determine restart time in CST
  const restartTimestamp = Date.now() + WAIT_TIME_MS
  const restartTime = new Date(restartTimestamp).toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour12: true })
  const nextIndex = index - 1 > 0 ? index - 1 : 1

  console.log(`🚨 Script exiting. Restart at seat-${nextIndex} after ~1 hour at: ${restartTime} CST`)

  saveProgress(nextIndex, restartTimestamp)
  process.exit(1)
}
// Function to trigger code sync requests for failing repo (n), n-1, and n+1
/**
 *
 * @param index
 * @param seat
 */
async function triggerCodeSync (seat) {
  const postUrl = POST_URL.replace('#', seat)
  console.log(`🔄 Calling Helix Admin Code Sync at: ${postUrl}`)

  try {
    const postResponse = await fetch(postUrl, { method: 'POST' })

    if (postResponse.status !== 202) {
      console.error(`No code found for seat-${seat}. Ensure repo exists.`)
      saveAndExit(seat)
      process.exit(1)
    }
    const postData = await postResponse.json()
    const detailsUrl = `${postData.links.self}/details`
    console.log(`🔍 Checking details at: ${detailsUrl}`)

    await checkPhaseCompletion(detailsUrl, seat)
  } catch (error) {
    console.error(`Error processing seat-${seat}:`, error)
    throw error
  }
}

/**
 *
 * @param detailsUrl
 * @param seat
 * @param maxRetries
 * @param interval
 */
async function checkPhaseCompletion (detailsUrl, seat, maxRetries = 60, interval = 1000) {
  let attempts = 0

  while (attempts < maxRetries) {
    try {
      const detailsResponse = await fetch(detailsUrl)
      const detailsData = await detailsResponse.json()
      if (detailsData.state === 'stopped') {
        if (detailsData.progress && detailsData?.progress.processed >= GIT_FILES_TO_CHECK) {
          console.log(`✅ Seat-${seat} processing completed.`)
          return
        } else if (detailsData.error.includes('rate limit exceeded')) {
          console.log(`⚠️ Seat-${seat} processing rate limit exceeded.`)
          saveAndExit(seat)
        } else {
          console.log('Unknown state! Data:', detailsData)
          saveAndExit(seat)
        }
      } else {
        console.log(`⏳ Seat-${seat} still processing... retrying (${attempts + 1}/${maxRetries}) in ${(interval / 1000)}s.`)
      }
    } catch (error) {
      console.error(`Error fetching details for seat-${seat}:`, error)
    }

    attempts++
    await new Promise(resolve => setTimeout(resolve, interval)) // Wait 1s before retrying
  }

  await saveAndExit(seat)
}

// Main process loop
/**
 *
 */
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
