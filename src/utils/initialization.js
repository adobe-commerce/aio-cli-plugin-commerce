import { promptConfirm, promptInput, promptSelect } from './prompt.js'
import { runCommand } from './runCommand.js'
import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
import { getAndSelectInstances } from './accs.js'
const aioLogger = Logger('commerce:initialization.js')
const reset = '\x1b[0m'
const boldWhite = '\x1b[1m\x1b[37m'
/**
 * The initialization function serves as a place for all code in which we obtain
 * user inputs or set up the configuration to get the application ready to go.
 *
 * This will include things like:
 *  - whether the user wants sample data/backend or to use their own.
 *  - which template the user wants to use
 *  - github org/user and repo name to use
 *  - etc
 * @param args - args from the command
 * @param flags - flags from the command
 */
export async function initialization (args, flags) {
  console.log('🛒 Welcome to the Adobe Commerce Storefront Scaffolder 🛒\n' +
    '--------------------------------------------\n' +
'This tool aims to automate the GitHub repository creation, the content source uploading, and the initial content preview.\nIn just a few minutes, you\'ll have your very own storefront codebase as well as an Edge Delivery Services content space ready to go.\nLet\'s get started!')

  // GITHUB DESTINATION SELECTION
  let { repo } = flags
  let { stdout: org } = await runCommand("gh api user --jq '.login'")
  if (!org) {
    throw new Error('❌ Unable to get github username. Please authenticate first with `gh auth login`".')
  }
  const answeredYes = await promptConfirm(`Would you like to create the code repository under your Github username, "${org.trim()}"?`)
  if (!answeredYes) {
    org = await promptInput('Enter the GitHub organization under which to create the code repository')
  }

  if (!repo) {
    repo = await promptInput('Enter the GitHub storefront repo name to create:')
  }
  if (!org || !repo) {
    throw new Error('❌ Please provide both the github org/name and repo.')
  }
  console.log(`✅ Creating GitHub repository at: ${boldWhite}${org.trim()}/${repo}${reset}`)
  config.set('commerce.github.org', org.trim()) // TODO: without .trim, this fails for some reason when using the gh authed username
  config.set('commerce.github.repo', repo)

  // TEMPLATE SELECTION
  const template = await promptSelect('Which template would you like to use?', [
    'adobe-commerce/adobe-demo-store', // ACCS template
    'hlxsites/aem-boilerplate-commerce', // PaaS template
    'adobe-rnd/aem-boilerplate-xcom' // UE Template
    // 'aabsites/citisignal' // TODO: Cannot use citisignal until we resolve how to use templates that use config service as some core files are missing https://magento.slack.com/archives/C085R48U3R7/p1738785011567519
  ])
  config.set('commerce.template.org', template.split('/')[0])
  config.set('commerce.template.repo', template.split('/')[1])

  // DATASOURCE SELECTION
  const STR_DEMO = 'Use Adobe\'s demo API (Default Endpoints)'
  const STR_BYO = 'Provide your backend API URL (Mesh -> Your Endpoints)'
  const STR_PICK = 'Pick an available API (Mesh -> SaaS)'

  const commerceDataSourceOptions = [
    STR_DEMO,
    STR_PICK,
    STR_BYO
  ]
  const commerceDataSource = await promptSelect('How would you like to connect to Commerce data', commerceDataSourceOptions)

  let paasUrl = ''
  let catalogUrl = ''
  let saasUrl = ''

  if (commerceDataSource === STR_BYO) {
    paasUrl = await promptInput('Enter your Commerce GraphQL API URL (ex. https://mystore.com/graphql):').then(validateAndFormatURL)
    catalogUrl = await promptInput('Enter your Commerce Catalog Service API URL (ex. https://catalog-service.adobe.io/graphql):').then(validateAndFormatURL)
    if (!paasUrl || !catalogUrl) {
      throw Error('❌ Please provide a valid URL for Commerce GraphQL API and Catalog Service.')
    }
    const apiKey = await promptInput('Enter your Adobe Catalog Service API Key:')
    const envId = await promptInput('Enter your Adobe Environment Id:')
    config.set('commerce.apiKey', apiKey)
    config.set('commerce.environmentId', envId)
  } else if (commerceDataSource === STR_PICK) {
    const url = await getAndSelectInstances()
    saasUrl = url
  } else {
    // If using demo instance, we don't need to set any urls - they should just
    // copy from the config.
  }
  config.set('commerce.datasource.paas', paasUrl)
  config.set('commerce.datasource.catalog', catalogUrl)
  config.set('commerce.datasource.saas', saasUrl)
  aioLogger.debug('inputs', config.get('commerce'))
}

/**
 *
 * @param {string} url  a url like adobe.com, www.adobe.com, http://adobe.com, etc.
 * @returns {string|null} a validated and formatted URL or null if the input is invalid.
 */
function validateAndFormatURL (url) {
  // Regular expression to check if the string is a valid URL
  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/

  // If the URL doesn't match the pattern, return null
  if (!urlPattern.test(url)) {
    aioLogger.debug('string is not valid URL', url)
    return null
  }

  // If the URL doesn't start with 'http://' or 'https://', prepend 'https://'
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url
  } else if (/^http:\/\//i.test(url)) {
    // If the URL starts with 'http://', replace it with 'https://'
    url = url.replace(/^http:\/\//i, 'https://')
  }

  return url
}
