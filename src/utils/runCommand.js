import { exec, spawn } from 'child_process'
import { promisify } from 'util'
import Logger from '@adobe/aio-lib-core-logging'

const execPromise = promisify(exec)
const aioLogger = Logger('commerce:runCommand.js')

/**
 * Runs a command non-interactively. Supports optional cwd and other exec options.
 *
 * @param {string} command - The shell command to run
 * @param {object} [options={}] - Options passed to exec (e.g. { cwd: '/path/to/dir' })
 * @returns {Promise<{stdout: string, stderr: string}>}
 */
export async function runCommand (command, options = {}) {
  try {
    const { stdout, stderr } = await execPromise(command, options)
    aioLogger.debug('stdout:', stdout)
    aioLogger.debug('stderr:', stderr)
    return { stdout, stderr }
  } catch (error) {
    aioLogger.debug(error)
    throw error
  }
}

/**
 * Runs a command interactively with inherited stdin/stdout and captured stderr.
 * Stderr is forwarded to the terminal in real time AND collected so callers
 * can inspect it when the command fails.
 *
 * @param {string} command - The shell command to run
 * @param {object} [options={}] - Options for spawn (e.g. { cwd: '/path/to/dir' })
 * @returns {Promise<number>} - Exit code of the spawned process
 */
export function runInteractiveCommand (command, options = {}) {
  return new Promise((resolve, reject) => {
    const stderrChunks = []
    const proc = spawn(command, [], {
      stdio: ['inherit', 'inherit', 'pipe'],
      shell: true,
      ...options
    })
    proc.stderr.on('data', (chunk) => {
      process.stderr.write(chunk)
      stderrChunks.push(chunk)
    })
    proc.on('close', (code, signal) => {
      if (code !== 0) {
        const err = new Error(`Command exited with code ${code}${signal ? ` (signal: ${signal})` : ''}`)
        err.stderr = Buffer.concat(stderrChunks).toString()
        reject(err)
      } else {
        resolve(code ?? 0)
      }
    })
    proc.on('error', (err) => {
      reject(err)
    })
  })
}
