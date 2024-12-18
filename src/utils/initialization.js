import { promptInput, promptSelect } from './prompt.js'
import config from '@adobe/aio-lib-core-config'
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
  // aioLogger.debug('scaffold flags=%o', flags)
  let { org, repo } = flags
  if (!org) {
    org = await promptInput('Enter your Github Org or Username:')
  }
  if (!repo) {
    repo = await promptInput('Enter the name of the repo you wish to create:')
  }
  if (!org || !repo) {
    throw new Error('github org/name and repo must be provided')
  }
  config.set('github.org', org)
  config.set('github.repo', repo)

  const template = await promptSelect('Which template would you like to use?', ['hlxsites/aem-boilerplate-commerce', 'AdobeDevXSC/citisignal-one'])
  config.set('template.org', template.split('/')[0])
  config.set('template.repo', template.split('/')[1])

  const commerceDataSourceOptions = ['Provide a backend URL', 'Pick an available instance', 'Use Adobe\'s demo instance']
  const commerceDataSource = await promptSelect('How would you like to connect to Commerce data', commerceDataSourceOptions)

  let coreUrl, catalogUrl
  if (commerceDataSource === 'Provide a backend URL') {
    coreUrl = await promptInput('Enter your Commerce backend URL:')
    catalogUrl = await promptInput('Enter your Commerce Catalog Service URL:')
    // TODO: validate inputs and ensure proper formed url (https://..../) and that they are graphql! (maybe a quick curl?)
  } else if (commerceDataSource === 'Pick an available instance') {
    // let { coreUrl, catalogUrl } = await getAndSelectInstances() // TODO: implement
    coreUrl = 'https://na1-ccsaas-service-qa.commerce-core-saas.com/9JjnV3amskX6mEeyYADfiP/graphql/'
    catalogUrl = 'https://na1-ccsaas-service-qa.commerce-core-saas.com/9JjnV3amskX6mEeyYADfiP/graphql/'
  } else {
    // if using demo instance, just leave empty to skip setting later(see @importer.js modifyConfig function)
    coreUrl = ''
    catalogUrl = ''
  }

  config.set('commerce.datasource.core', coreUrl)
  config.set('commerce.datasource.catalog', catalogUrl)
  // TODO: should we also make some queries here to set other data used in EDS config, see https://main--aem-boilerplate-commerce--hlxsites.aem.live/configs.json
}
