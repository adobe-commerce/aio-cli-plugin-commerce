import { exec } from 'child_process'
import { promisify } from 'util'
const execPromise = promisify(exec)

/**
 *
 * @param command
 */
export async function runCommand (command) {
  try {
    const { stdout, stderr } = await execPromise(command)
    return { stdout, stderr }
  } catch (error) {
    console.error(`Execution error: ${error}`)
  }
}
