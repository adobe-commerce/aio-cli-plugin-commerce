import EnvLib from '@adobe/aio-lib-env'

const { getCliEnv } = EnvLib
const clientEnv = getCliEnv()

const COMMON = {
  // need to update this to the correct official URL
  REMOTE_ACCS_MESH_CONFIG: 'https://gist.githubusercontent.com/revanth0212/1c83bd4ad0be161c209cef07722df04c/raw'
}

const PROD_CONSTANTS = {
  ...COMMON,
  AIO_CLI_API_KEY: 'aio-cli-console-auth',
  CCM_BASE_URL: 'https://ccm.api.commerce.adobe.com'
}

const STAGE_CONSTANTS = {
  ...COMMON,
  AIO_CLI_API_KEY: 'aio-cli-console-auth-stage',
  CCM_BASE_URL: 'https://ccm-stage.api.commerce.adobe.com'
}

export default clientEnv === 'stage' ? STAGE_CONSTANTS : PROD_CONSTANTS
