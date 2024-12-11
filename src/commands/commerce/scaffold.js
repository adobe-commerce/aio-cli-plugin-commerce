/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { Args, Command, Flags } from '@oclif/core'
import Logger from '@adobe/aio-lib-core-logging'
import { openBrowser } from '../../utils/openBrowser.js'
import { runCommand } from '../../utils/runCommand.js'
import { uploadStarterContent } from '../../utils/content.js'
import { preview } from '../../utils/preview.js'
import { promptConfirm, promptInput, promptSelect } from '../../utils/prompt.js'
import config from '@adobe/aio-lib-core-config'
import { modifyFstab, modifySidekick } from '../../utils/github.js'

const aioLogger = Logger('commerce:scaffold.js')

export class ScaffoldCommand extends Command {
  async run () {
    console.log('Welcome to the Adobe Commerce Storefront Scaffolder\n' +
                '---------------------------------------------------\n' +
      'This tool aims to automate the GitHub repository creation, the content source uploading, and the initial content preview.\nIn just a few minutes, you\'ll have your very own storefront codebase as well as an Edge Delivery Services content space ready to go.\nLet\'s get started!')
    const { args, flags } = await this.parse(ScaffoldCommand)
    // aioLogger.debug('scaffold flags=%o', flags)
    let { org, repo } = flags
    if (!org) {
      org = await promptInput('Enter the name of your Github Org:')
    }
    if (!repo) {
      repo = await promptInput('Enter the name of the repo you wish to create:')
    }
    if (!org || !repo) {
      throw new Error('github org and repo must be provided')
    }
    config.set('github.org', org)
    config.set('github.repo', repo)

    // TODO: add more templates, like SalesDemo (citisignal), Luma Bridge, etc.
    // const template = await promptSelect('Which template would you like to use?', ['hlxsites/aem-boilerplate-commerce'])
    const template = 'hlxsites/aem-boilerplate-commerce'
    config.set('template.org', template.split('/')[0])
    config.set('template.repo', template.split('/')[1])

    // 1. create repo from template (gh repo create)
    aioLogger.log(`Creating repo at https://github.com/${org}/${repo} ...`)
    // TODO: after the ?sheet=prod line is removed from the boilerplate, we can switch back
    // await runCommand(`gh repo create ${org}/${repo} --template ${template} --public`)
    await runCommand(`gh repo create ${org}/${repo} --template sirugh/my-temp-repo --public`)

    // 2. modify fstab.yaml and sidekick config in github.
    await modifyFstab()
    await modifySidekick()

    // 3. install code sync
    // this.log('Install the AEM Code Sync bot to your org and repo.')
    openBrowser('https://github.com/apps/aem-code-sync/installations/select_target')
    const res = await promptConfirm('Did you install the AEM Code Sync bot?')
    if (!res) {
      aioLogger.error('You must install the AEM Code Sync bot before continuing. Install before running the command again. https://github.com/apps/aem-code-sync/installations/select_target')
      return
    }
    // 4. upload starter content to Dark Alley
    const filePaths = await uploadStarterContent()

    // 5. preview content using hlx API
    await preview(filePaths)

    // 6. open content space
    aioLogger.log(`Edit your content: https://da.live/#/${org}/${repo}`)
    openBrowser(`https://da.live/#/${org}/${repo}`)

    // 7. open preview page
    aioLogger.log(`Content Preview: https://main--${repo}--${org}.aem.page/`)
    openBrowser(`https://main--${repo}--${org}.aem.page/`)

    aioLogger.log('To run locally, try "aio commerce:dev"')
  }
}

ScaffoldCommand.flags = {
  org: Flags.string({ char: 'o', description: 'your github org, ie "hlxsites"' }),
  repo: Flags.string({ char: 'r', description: 'your github repo, ie "aem-boilerplate-commerce"' })
}

ScaffoldCommand.args = {
}

ScaffoldCommand.description = 'Scaffold your own Adobe Commerce storefront'
ScaffoldCommand.examples = [
  '$ aio commerce:scaffold --org sirugh --repo my-storefront'
]
