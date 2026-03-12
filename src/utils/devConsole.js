import IMSLib from '@adobe/aio-lib-ims'
import ConsoleLib from '@adobe/aio-cli-lib-console'
import EnvLib from '@adobe/aio-lib-env'
import IMSContext from '@adobe/aio-lib-ims/src/context.js'
import CONSTANTS from './constants.js'

const { getToken, context } = IMSLib
const { CLI } = IMSContext
const { init } = ConsoleLib
const { getCliEnv } = EnvLib
const { AIO_CLI_API_KEY } = CONSTANTS

/**
 * @returns {consoleCLI, accessToken}
 */
export async function getLibConsoleCLI () {
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
