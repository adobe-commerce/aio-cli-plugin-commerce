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
import { Command, Flags } from '@oclif/core'
import { openBrowser } from '../../utils/openBrowser.js'
import { uploadStarterContent } from '../../utils/content.js'
import { previewContent, publishContent } from '../../utils/preview.js'
import { promptConfirm } from '../../utils/prompt.js'
import config from '@adobe/aio-lib-core-config'
import { createRepo, modifyFstab, modifySidekickConfig } from '../../utils/github.js'
import { initialization } from '../../utils/initialization.js'
import { createMesh, getMeshDetailsPage } from '../../utils/mesh.js'

const reset = '\x1b[0m'
const boldWhite = '\x1b[1m\x1b[37m'

export class InitCommand extends Command {
  async run () {
    const { args, flags } = await this.parse(InitCommand)
    if (flags.repo && flags.template && flags.datasource) {
      // Skip initialization. Instead just set configs here.
      config.set('commerce.github.org', flags.repo.split('/')[0])
      config.set('commerce.github.repo', flags.repo.split('/')[1])
      config.set('commerce.template.org', flags.template.split('/')[0])
      config.set('commerce.template.repo', flags.template.split('/')[1])
      config.set('commerce.datasource.paas', flags.datasource)
      config.set('commerce.datasource.catalog', flags.datasource)
    } else {
      await initialization(args, flags)
    }
    const { org: githubOrg, repo: githubRepo } = config.get('commerce.github')
    const { saas, paas } = config.get('commerce.datasource')

    const runAIOCommand = async (command, args) => {
      return await this.config.runCommand(command, args)
    }
    if (saas || paas) {
      if (flags.skipMesh) {
        // this means the user chose a non-demo endpoint and still opted out of
        // API Mesh creation. Use their endpoints in configs.js
        console.log(
          'Not creating API Mesh - will use provided endpoints.'
        )
      } else {
        const installedPlugins = this.config.plugins
        await createMesh(runAIOCommand, installedPlugins)
      }
    } else {
      // this means the user chose to use demo env, so no need to create mesh
      console.log('Not creating API Mesh - will use demo environment.')
    }

    await createRepo()
    await modifyFstab()
    await modifySidekickConfig()

    if (githubOrg === 'adobe-summit-L322' || githubOrg === 'adobe-summit-L321') {
      console.log('✅ AEM Code Sync Bot automatically installed :)')
    } else {
      openBrowser('https://github.com/apps/aem-code-sync/installations/select_target')
      const res = await promptConfirm('Did you install the AEM Code Sync bot?')
      if (!res) {
        throw new Error('❌ You must install the AEM Code Sync bot before continuing. Install before running the command again. https://github.com/apps/aem-code-sync/installations/select_target')
      }
    }

    const filePaths = await uploadStarterContent()
    await previewContent(filePaths)
    await publishContent()

    const meshDetailsPageURL = getMeshDetailsPage()
    const meshUrl = config.get('commerce.datasource.meshUrl')

    console.log(`🎉 ${boldWhite}Setup complete!${reset} 🎉`)
    console.log(`${boldWhite}Customize your code:${reset} https://github.com/${githubOrg}/${githubRepo}`)
    console.log(`${boldWhite}Edit your content:${reset} https://da.live/#/${githubOrg}/${githubRepo}`)
    console.log(`${boldWhite}Manage your config:${reset} https://da.live/sheet#/${githubOrg}/${githubRepo}/configs-stage`)
    console.log(`${boldWhite}Preview your storefront:${reset} https://main--${githubRepo}--${githubOrg}.aem.page/`)
    console.log(`${boldWhite}Run your storefront locally:${reset} "aio commerce:dev"`)
    if (meshUrl) {
      console.log(`${boldWhite}Try out your API:${reset} ${meshUrl}`)
      console.log(`To check the status of your Mesh, run ${boldWhite}aio api-mesh status${reset}`)
      console.log(`To update your Mesh, run ${boldWhite}aio api-mesh update mesh_config.json${reset}`)
      if (meshDetailsPageURL) {
        meshDetailsPageURL && console.log(`${boldWhite}View your Mesh details:${reset} ${meshDetailsPageURL}`)
      }
    }
    console.log('For next steps, including how to customize your storefront and make it your own, check out our docs:\nhttps://experienceleague.adobe.com/developer/commerce/storefront/')

    // cleanup
    config.delete('commerce')
    // reset github org and repo, for aio commerce:dev command
    config.set('commerce.github', {
      org: githubOrg,
      repo: githubRepo
    })
  }
}

InitCommand.flags = {
  datasource: Flags.string({
    char: 'd',
    description: 'your Commerce datasource, ie "https://na1-sandbox.api.commerce.adobe.com/F1psVHfVkXhcQxhqNbCora/graphql'
  }),
  repo: Flags.string({
    char: 'r',
    description: 'your github repo to create, ie my-git-user/my-site"'
  }),
  skipMesh: Flags.boolean({
    default: false,
    description: 'Skip creating API Mesh'
  }),
  template: Flags.string({
    char: 't',
    description: 'Template to use for storefront code and content, ie "adobe-commerce/adobe-demo-store"'
  })
}

InitCommand.args = {
}

InitCommand.description = 'Scaffold your own Adobe Commerce storefront'
InitCommand.examples = [
  '$ aio commerce:init --template adobe-commerce/adobe-demo-store --skipMesh --repo my-git-user/my-site'
]
