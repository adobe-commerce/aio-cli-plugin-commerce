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

  // TODO: add more templates like Luma Bridge, etc.
  const template = await promptSelect('Which template would you like to use?', ['hlxsites/aem-boilerplate-commerce', 'AdobeDevXSC/citisignal-one'])
  config.set('template.org', template.split('/')[0])
  config.set('template.repo', template.split('/')[1])
}
