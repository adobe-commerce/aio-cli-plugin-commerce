import { exec } from 'child_process'
import { promisify } from 'util'
import Logger from '@adobe/aio-lib-core-logging'
const execPromise = promisify(exec)
const aioLogger = Logger('commerce:runCommand.js')
/**
 *
 * @param command
 */
export async function runCommand (command) {
  try {
    const { stdout, stderr } = await execPromise(command)
    aioLogger.debug('stdout:', stdout)
    aioLogger.debug('stderr:', stderr)
    return { stdout, stderr }
  } catch (error) {
    aioLogger.debug(error)
    throw error
  }
}
