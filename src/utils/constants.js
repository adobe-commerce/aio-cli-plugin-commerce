import EnvLib from '@adobe/aio-lib-env'

const { getCliEnv } = EnvLib
const clientEnv = getCliEnv()

const PROD_CONSTANTS = {
  AIO_CLI_API_KEY: 'aio-cli-console-auth',
  CCM_BASE_URL: 'https://ccm.api.commerce.adobe.com'
}

const STAGE_CONSTANTS = {
  AIO_CLI_API_KEY: 'aio-cli-console-auth-stage',
  CCM_BASE_URL: 'https://ccm-stage.api.commerce.adobe.com'
}

export default clientEnv === 'stage' ? STAGE_CONSTANTS : PROD_CONSTANTS
