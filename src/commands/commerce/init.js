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
import { previewContent, publishContent } from '../../utils/preview.js'
import { promptConfirm } from '../../utils/prompt.js'
import config from '@adobe/aio-lib-core-config'
import { createRepo, modifyFstab, modifySidekickConfig, createAndUploadMeshWorkspace } from '../../utils/github.js'
import { initialization } from '../../utils/initialization.js'

const aioLogger = Logger('commerce:init.js')

export class InitCommand extends Command {
  async run () {
    const { args, flags } = await this.parse(InitCommand)
    await initialization(args, flags)
    const { org: githubOrg, repo: githubRepo } = config.get('commerce.github')

    const runAIOCommand = async (command, args) => {
        await this.config.runCommand(command, args);
    };

    await createRepo()
    await modifyFstab()
    await modifySidekickConfig()
    await createAndUploadMeshWorkspace(runAIOCommand);

    openBrowser('https://github.com/apps/aem-code-sync/installations/select_target')
    const res = await promptConfirm('Did you install the AEM Code Sync bot?')
    if (!res) {
      throw new Error('❌ You must install the AEM Code Sync bot before continuing. Install before running the command again. https://github.com/apps/aem-code-sync/installations/select_target')
    }

    const filePaths = await uploadStarterContent()
    await previewContent(filePaths)
    await publishContent()

    const reset = '\x1b[0m'
    const boldWhite = '\x1b[1m\x1b[37m'
    console.log(`🎉 ${boldWhite}Setup complete!${reset} 🎉`)
    console.log(`${boldWhite}Customize your code:${reset} https://github.com/${githubOrg}/${githubRepo}`)
    console.log(`${boldWhite}Edit your content:${reset} https://da.live/#/${githubOrg}/${githubRepo}`)
    console.log(`${boldWhite}Preview your storefront:${reset} https://main--${githubRepo}--${githubOrg}.aem.page/`)
    console.log(`${boldWhite}Run locally:${reset} "aio commerce:dev"`)
    console.log('For next steps, including how to customize your storefront and make it your own, check out our docs:\nhttps://experienceleague.adobe.com/developer/commerce/storefront/')
  }
}

InitCommand.flags = {
  org: Flags.string({ char: 'o', description: 'your github org, ie "hlxsites"' }),
  repo: Flags.string({ char: 'r', description: 'your github repo, ie "aem-boilerplate-commerce"' })
}

InitCommand.args = {
}

InitCommand.description = 'Scaffold your own Adobe Commerce storefront'
InitCommand.examples = [
  '$ aio commerce:init --org sirugh --repo my-storefront'
]
