import { promisify } from 'util'
import { exec } from 'child_process'
import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:openBrowser.js')

const execPromise = promisify(exec)
/**
 *
 * @param url - the url to open
 */
async function openBrowser (url) {
  // TODO: enforce https protocol
  if (!url.startsWith('https://')) {
    throw Error('url must start with https://')
  }

  let command

  switch (process.platform) {
    case 'darwin': // macOS
      command = `open "${url}"`
      break
    case 'win32': // Windows
      command = `start "" "${url}"`
      break
    case 'linux': // Linux
      command = `xdg-open "${url}"`
      break
    default:
      aioLogger.error('Unsupported platform:', process.platform)
      return
  }

  try {
    await execPromise(command)
  } catch (error) {
    if (error) {
      aioLogger.error('Failed to open browser:', error)
    }
  }
}

export { openBrowser }
