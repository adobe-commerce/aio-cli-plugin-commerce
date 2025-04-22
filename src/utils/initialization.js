import { promptConfirm, promptInput, promptSelect } from './prompt.js'
import { runCommand } from './runCommand.js'
import config from '@adobe/aio-lib-core-config'
import Logger from '@adobe/aio-lib-core-logging'
import { getAndSelectInstances } from './accs.js'
import { selectOrganization } from './devConsole.js'

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
  console.log(`
🛒 Welcome to the Adobe Commerce Storefront Scaffolder 🛒
----------------------------------------------------------
This tool aims to automate the GitHub repository creation, the content source uploading, and the initial content preview.\nIn just a few minutes, you'll have your very own storefront codebase as well as an Edge Delivery Services content space ready to go.\n\nBefore we begin, make sure you have the following prerequisites completed:

- gh cli installed and authenticated: https://cli.github.com/
- aio authenticated and configured
- Adobe IMS organization access and entitlement if creating API Mesh
- Developer Terms & Conditions accepted if creating API Mesh

You can read more here: https://github.com/adobe-commerce/aio-cli-plugin-commerce?tab=readme-ov-file#prerequisites\n
Now, let's get started!`)

  // GITHUB DESTINATION SELECTION
  let { repo, template, skipGit } = flags
  let org
  if (!skipGit) {
    try {
      const { stdout } = await runCommand('gh api user --jq .login')
      org = stdout
    } catch (e) {
      aioLogger.debug(e)
    }
    if (!org) {
      throw new Error('❌ Unable to get github username. Please authenticate first with `gh auth login`".')
    }
  }
  let answer
  if (org) {
    answer = await promptConfirm(`Would you like to create the code and content under your github username, "${org.trim()}"?`)
  }
  if (!answer) {
    org = await promptInput('Enter the organization under which to create the code and content:')
  }
  repo = repo?.split('/')[1] || await promptInput('Enter the storefront name to create (must not exist already):')

  if (!org || !repo) {
    throw new Error('❌ Please provide both the github org/name and repo.')
  }
  config.set('commerce.github.org', org.trim()) // TODO: without .trim, this fails for some reason when using the gh authed username
  config.set('commerce.github.repo', repo)

  // TEMPLATE SELECTION
  template = template || await promptSelect('Which template would you like to use?', [
    'adobe-commerce/adobe-demo-store', // ACCS template
    'adobe-commerce/ccdm-demo-store', // ACO template
    'hlxsites/aem-boilerplate-commerce' // template
    // 'adobe-rnd/aem-boilerplate-xcom' // UE Template
    // 'aabsites/citisignal' // TODO: Cannot use citisignal until we resolve how to use templates that use config service as some core files are missing https://magento.slack.com/archives/C085R48U3R7/p1738785011567519
  ])
  config.set('commerce.template.org', template.split('/')[0])
  config.set('commerce.template.repo', template.split('/')[1])

  // DATASOURCE SELECTION
  const STR_DEMO = 'Use the demo Adobe Commerce tenant'
  const STR_PICK = 'Pick an available Adobe Commerce tenant'
  const STR_BYO = 'Provide your own Adobe Commerce tenant API URL'

  const commerceDataSourceOptions = [
    STR_DEMO,
    STR_PICK,
    STR_BYO
  ]
  const commerceDataSource = await promptSelect('How would you like to connect to Commerce data', commerceDataSourceOptions)

  let saasUrl = ''

  if (commerceDataSource === STR_BYO) {
    saasUrl = await promptInput('Enter your Commerce GraphQL API URL (ex. https://example.com/graphql):').then(validateAndFormatURL)
  } else if (commerceDataSource === STR_PICK) {
    const consoleConfig = config.get('console')
    if (!consoleConfig || !consoleConfig.org) {
      await selectOrganization()
    }
    const url = await getAndSelectInstances()
    saasUrl = url
  } else {
    // If using demo instance, we don't need to set any urls - they should just
    // copy from the config.
  }
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
