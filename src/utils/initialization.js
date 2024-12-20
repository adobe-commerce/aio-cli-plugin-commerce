import { promptConfirm, promptInput, promptSelect } from './prompt.js'
import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
import { getAndSelectInstances } from './accs.js'
const aioLogger = Logger('commerce:initialization.js')
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
  const oldConfig = config.get('commerce')

  if (oldConfig) {
    console.log(JSON.stringify(oldConfig, null, 2))
    const skip = await promptConfirm('^^ Existing config found! Do you want to use it?')
    if (skip) return
  }

  console.log('🛒 Welcome to the Adobe Commerce Storefront Scaffolder 🛒\n' +
    '--------------------------------------------\n' +
'This tool aims to automate the GitHub repository creation, the content source uploading, and the initial content preview.\nIn just a few minutes, you\'ll have your very own storefront codebase as well as an Edge Delivery Services content space ready to go.\nLet\'s get started!')

  // GITHUB DESTINATION SELECTION
  let { org, repo } = flags
  if (!org) {
    org = await promptInput('Enter your GitHub username or organization name:')
  }
  if (!repo) {
    repo = await promptInput('Enter your GitHub storefront repository name:')
  }
  if (!org || !repo) {
    throw new Error('❌ Please provide both the github org/name and repo.')
  }
  config.set('commerce.github.org', org)
  config.set('commerce.github.repo', repo)

  // TEMPLATE SELECTION
  const template = await promptSelect('Which template would you like to use?', ['hlxsites/aem-boilerplate-commerce', 'AdobeDevXSC/citisignal-one'])
  config.set('commerce.template.org', template.split('/')[0])
  config.set('commerce.template.repo', template.split('/')[1])

  // DATASOURCE SELECTION
  const STR_DEMO = 'Use Adobe\'s demo instance'
  const STR_BYO = 'Provide your backend API URL'
  const STR_PICK = 'Pick an available instance'

  const commerceDataSourceOptions = [STR_DEMO, STR_PICK, STR_BYO]
  const commerceDataSource = await promptSelect('How would you like to connect to Commerce data', commerceDataSourceOptions)
  let coreUrl, catalogUrl
  if (commerceDataSource === STR_BYO) {
    coreUrl = await promptInput('Enter your Commerce GraphQL API URL (ex. https://mystore.com/graphql):').then(validateAndFormatURL)
    catalogUrl = await promptInput('Enter your Commerce Catalog Service API URL (ex. https://catalog-service.adobe.io/graphql):').then(validateAndFormatURL)
    if (!coreUrl || !catalogUrl) {
      throw Error('❌ Please provide a valid URL for Commerce GraphQL API and Catalog Service.')
    }
  } else if (commerceDataSource === STR_PICK) {
    const url = await getAndSelectInstances()
    coreUrl = url
    catalogUrl = url
  } else {
    // if using demo instance, just leave empty to skip setting later(see @config.js modifyConfig function)
    coreUrl = ''
    catalogUrl = ''
  }
  config.set('commerce.datasource.core', coreUrl)
  config.set('commerce.datasource.catalog', catalogUrl)

  if (commerceDataSource === STR_BYO || commerceDataSource === STR_PICK) {
    // TODO: if user selected BYO or to pick, they should also provide other configurations https://jira.corp.adobe.com/browse/USF-1882
  }
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
