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
import { uploadStarterContent } from '../../utils/content.js'
import { previewContent } from '../../utils/preview.js'
import { promptConfirm } from '../../utils/prompt.js'
import config from '@adobe/aio-lib-core-config'
import { createRepo, modifyFstab, modifySidekickConfig } from '../../utils/github.js'
import { initialization } from '../../utils/initialization.js'

const aioLogger = Logger('commerce:scaffold.js')

export class ScaffoldCommand extends Command {
  async run () {
    const { args, flags } = await this.parse(ScaffoldCommand)
    await initialization(args, flags)
    const { org: githubOrg, repo: githubRepo } = config.get('github')

    await createRepo()
    await modifyFstab()
    await modifySidekickConfig()

    openBrowser('https://github.com/apps/aem-code-sync/installations/select_target')
    const res = await promptConfirm('Did you install the AEM Code Sync bot?')
    if (!res) {
      aioLogger.error('❌ You must install the AEM Code Sync bot before continuing. Install before running the command again. https://github.com/apps/aem-code-sync/installations/select_target')
      return
    }

    const filePaths = await uploadStarterContent()
    await previewContent(filePaths)

    aioLogger.log(`✅ Edit your content: https://da.live/#/${githubOrg}/${githubRepo}`)
    openBrowser(`https://da.live/#/${githubOrg}/${githubRepo}`)

    aioLogger.log(`✅ Content Preview: https://main--${githubRepo}--${githubOrg}.aem.page/`)
    openBrowser(`https://main--${githubRepo}--${githubOrg}.aem.page/`)

    aioLogger.log('To run locally, try "aio commerce:dev"')
    console.log('💸 Thanks for using the CLI tool 💸\n' +
      'For next steps, including how to customize your storefront and make it your own, check out our docs:\nhttps://experienceleague.adobe.com/developer/commerce/storefront/\n')
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
