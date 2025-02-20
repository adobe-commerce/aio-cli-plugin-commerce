import IMSLib from '@adobe/aio-lib-ims'
import ConsoleLib from '@adobe/aio-cli-lib-console'
import EnvLib from '@adobe/aio-lib-env'
import Logger from '@adobe/aio-lib-core-logging'
import Config from '@adobe/aio-lib-core-config'
import IMSContext from '@adobe/aio-lib-ims/src/context.js'
import CONSTANTS from './constants.js'

const { getToken, context } = IMSLib
const { CLI } = IMSContext
const { init } = ConsoleLib
const { getCliEnv } = EnvLib
const { AIO_CLI_API_KEY } = CONSTANTS
const aioLogger = Logger('commerce:devConsole.js')

/**
 * @returns {consoleCLI, accessToken}
 */
async function getLibConsoleCLI () {
  await context.setCli({ 'cli.bare-output': true }, false)

  const clientEnv = getCliEnv()

  const accessToken = await getToken(CLI)

  const consoleCLI = await init({
    accessToken,
    apiKey: AIO_CLI_API_KEY,
    env: clientEnv
  })

  return { consoleCLI, accessToken }
}

/**
 * @param options
 * @returns {string} Returns organizations the user belongs to
 */
export async function selectOrganization (options = { verbose: true }) {
  aioLogger.debug('Initializing organization selection for')

  const { consoleCLI } = await getLibConsoleCLI()

  aioLogger.debug('Get the selected organization')

  const consoleConfigOrg = Config.get('console.org')

  if (!consoleConfigOrg) {
    const organizations = await consoleCLI.getOrganizations()

    aioLogger.debug(`Retrieved organizations : ${JSON.stringify(organizations, null, 2)}`)

    if (organizations.length !== 0) {
      const selectedOrg = await consoleCLI.promptForSelectOrganization(organizations)

      aioLogger.debug('Set the console org config')

      Config.set('console.org', selectedOrg)

      // remove selected project and workspace from config and let the user select a new one
      Config.delete('console.project')
      Config.delete('console.workspace')
      return Object.assign({}, selectedOrg)
    } else {
      aioLogger.error('No organizations found')
    }
  } else {
    aioLogger.debug(`Selected organization config ${JSON.stringify(consoleConfigOrg, null, 2)}`)
    if (options.verbose) {
      console.log(`Selected organization: ${consoleConfigOrg.name}`)
    }

    return Object.assign({}, consoleConfigOrg)
  }
}
