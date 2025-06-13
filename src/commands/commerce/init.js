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
import { codeSyncComplete, createRepo } from '../../utils/github.js'
import { initialization } from '../../utils/initialization.js'
import { setupMesh, getMeshDetailsPage } from '../../utils/mesh.js'
import Logger from '@adobe/aio-lib-core-logging'

const reset = '\x1b[0m'
const boldWhite = '\x1b[1m\x1b[37m'
const aioLogger = Logger('commerce:init.js')

export class InitCommand extends Command {
  async run () {
    const { args, flags } = await this.parse(InitCommand)
    if (flags.repo && flags.template && flags.datasource !== undefined) {
      // Skip initialization. Instead just set configs here.
      config.set('commerce.github.org', flags.repo.split('/')[0])
      config.set('commerce.github.repo', flags.repo.split('/')[1])
      config.set('commerce.template.org', flags.template.split('/')[0])
      config.set('commerce.template.repo', flags.template.split('/')[1])
      config.set('commerce.datasource.saas', flags.datasource)
      aioLogger.debug(config.get('commerce'))
    } else {
      await initialization(args, flags)
    }
    const { org: githubOrg, repo: githubRepo } = config.get('commerce.github')
    const { org: templateOrg, repo: templateRepo } = config.get('commerce.template')
    const { saas } = config.get('commerce.datasource')

    const runAIOCommand = async (command, args) => {
      return await this.config.runCommand(command, args)
    }
    try {
      if (saas) {
        if (flags.skipMesh) {
          // this means the user chose a non-demo endpoint and still opted out of
          // API Mesh creation. Use their endpoints in configs.js
          console.log(
            'Not creating API Mesh - will use provided endpoints.'
          )
        } else {
          const installedPlugins = this.config.plugins
          await setupMesh(runAIOCommand, installedPlugins)
        }
      } else {
        // this means the user chose to use demo env, so no need to create mesh
        console.log('Not creating API Mesh - will use demo environment.')
      }

      if (flags.skipGit) {
        console.log(`Not creating Git Repos - assuming it already exists at https://github.com/${githubOrg}/${githubRepo}`)
      } else {
        await createRepo(githubOrg, githubRepo, templateOrg, templateRepo)
        openBrowser('https://github.com/apps/aem-code-sync/installations/select_target')
        const res = await promptConfirm('Did you install the AEM Code Sync bot? https://github.com/apps/aem-code-sync/installations/select_target')
        if (!res) {
          throw new Error('❌ You must install the AEM Code Sync bot before continuing. Install before running the command again. https://github.com/apps/aem-code-sync/installations/select_target')
        }
        console.log('⏳ Validating code sync. This can take a while..')
        await codeSyncComplete(githubOrg, githubRepo)
      }
      const filePaths = await uploadStarterContent()
      // Certain files are specific to da, and should not be previewed/published.
      const filePathsWithoutPrivate = filePaths.filter(file => !file.startsWith('/.da/'))
      console.log('⏳ Previewing your content files...')
      await previewContent(filePathsWithoutPrivate)
      console.log('⏳ Publishing your content files...')
      await publishContent(filePathsWithoutPrivate)

      const meshUrl = config.get('commerce.datasource.meshUrl')
      const adminUrl = config.get('commerce.datasource.admin')

      console.log('\n************************************************')
      console.log(`🎉 ${boldWhite}Setup complete!${reset} 🎉\n`)
      console.log(`${boldWhite}Customize your code:${reset} https://github.com/${githubOrg}/${githubRepo}`)
      if (templateRepo === 'adobe-demo-store' || templateRepo === 'ccdm-demo-store') {
        console.log(`${boldWhite}Manage your Commerce config:${reset} https://da.live/sheet#/${githubOrg}/${githubRepo}/configs-stage`)
      } else {
        console.log(`${boldWhite}Manage your Commerce config:${reset} https://github.com/${githubOrg}/${githubRepo}/blob/main/config.json`)
      }
      console.log(`${boldWhite}Edit your content:${reset} https://da.live/#/${githubOrg}/${githubRepo}`)
      console.log(`${boldWhite}Preview your storefront:${reset} https://main--${githubRepo}--${githubOrg}.aem.page/`)
      if (adminUrl) {
        console.log(`${boldWhite}Access your Commerce Admin:${reset} ${adminUrl}`)
      }
      if (meshUrl) {
        const meshDetailsPageURL = getMeshDetailsPage()
        console.log(`${boldWhite}Try out your API:${reset} ${meshUrl}`)
        console.log(`To check the status of your Mesh, run ${boldWhite}aio api-mesh status${reset}`)
        console.log(`To update your Mesh, run ${boldWhite}aio api-mesh update mesh_config.json${reset}`)
        if (meshDetailsPageURL) {
          meshDetailsPageURL && console.log(`${boldWhite}View your Mesh details:${reset} ${meshDetailsPageURL}`)
        }
      }
      console.log('For next steps, including how to customize your storefront and make it your own, check out our docs:\nhttps://experienceleague.adobe.com/developer/commerce/storefront/')
      console.log('\n⚠️  IMPORTANT SECURITY NOTICE:')
      console.log('Your site is NOT protected by default. To secure your content and site:')
      console.log('• Content in DA: Configure permissions at https://da.live/docs/administration/permissions')
      console.log('• EDS site authentication: Follow guide at https://www.aem.live/docs/authentication-setup-authoring')
      console.log('• Git repository: Change your repository to private in GitHub settings')
      console.log('************************************************\n')
      // cleanup
      config.delete('commerce')
      // reset github org and repo, for aio commerce:dev command
      config.set('commerce.github', {
        org: githubOrg,
        repo: githubRepo
      })
    } catch (error) {
      console.log('\n************************************************')
      console.error('❌ Sorry to see the setup fail, please run the following commands before attempting a retry:\n')
      console.log(`Delete Github repo. Run ${boldWhite}gh repo delete ${githubOrg}/${githubRepo}${reset}`)
      console.log(`Delete API Mesh. Run ${boldWhite}aio api-mesh delete${reset}`)
      console.log(`Delete the Content at ${boldWhite}https://da.live/#/${githubOrg}/${githubRepo}${reset}`)
      console.log('************************************************\n')

      aioLogger.error(error)
      throw new Error('Setup failed. Please try again.')
    }
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
  skipGit: Flags.boolean({
    default: false,
    description: 'Skip creating Git Repo. Assumes you already created at --repo'
  }),
  skipMesh: Flags.boolean({
    default: false,
    description: 'Skip creating API Mesh'
  }),
  template: Flags.string({
    char: 't',
    description: 'Template to use for storefront code and content, ie "hlxsites/aem-boilerplate-commerce"'
  })
}

InitCommand.args = {
}

InitCommand.description = 'Scaffold your own Adobe Commerce storefront'
InitCommand.examples = [
  '$ aio commerce:init --template hlxsites/aem-boilerplate-commerce --skipMesh --repo my-git-user/my-site'
]
