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
import { createMesh, getMeshDetailsPage, confirmAPIMeshCreation } from '../../utils/mesh.js'
import { spawn } from 'child_process'
import { openSync } from 'fs'
import Logger from '@adobe/aio-lib-core-logging'
const aioLogger = Logger('commerce:init.js')

const reset = '\x1b[0m'
const boldWhite = '\x1b[1m\x1b[37m'

export class InitCommand extends Command {
  async run () {
    const { args, flags } = await this.parse(InitCommand)
    await initialization(args, flags)
    const { org: githubOrg, repo: githubRepo } = config.get('commerce.github')
    const { saas, paas } = config.get('commerce.datasource')

    const runAIOCommand = async (command, args) => {
      return await this.config.runCommand(command, args)
    }
    let shouldCreateMesh
    if (saas || paas) {
      shouldCreateMesh = await confirmAPIMeshCreation()
      if (shouldCreateMesh) {
        const installedPlugins = this.config.plugins
        await createMesh(runAIOCommand, installedPlugins)
        console.log(
          '⏳ Verifying Mesh provisioning behind the scenes. Please check mesh-verify.log for details, or run "aio commerce:mesh-verify" if there are failures.'
        )
        // Spawn detached child process to verify mesh in the background, without disrupting user's CLI session.
        try {
          const out = openSync('./mesh-verify.log', 'w')
          const err = openSync('./mesh-verify.log', 'a')

          const childProcess = spawn(
            'aio',
            ['commerce:mesh-verify'],
            {
              detached: false,
              stdio: ['ignore', out, err]
            }
          )
          // Detach from the parent process
          childProcess.unref()
        } catch (error) {
          aioLogger.debug(error)
          console.log(
            '❌ Unable to verify mesh provisioning. Please try again with "aio commerce:mesh-verify"'
          )
        }
      } else {
        // this means the user chose a non-demo endpoint and still opted out of
        // API Mesh creation. Use their endpoints in configs.js
        console.log(
          'Not creating API Mesh - will use provided endpoints.'
        )
      }
    } else {
      // this means the user chose to use demo env, so no need to create mesh
      console.log('Not creating API Mesh - will use demo environment.')
    }

    const meshDetailsPageURL = getMeshDetailsPage()
    const meshUrl = config.get('commerce.datasource.meshUrl')

    await createRepo()
    await modifyFstab()
    await modifySidekickConfig()

    // TODO: For summit, we can just pre-add the code sync bot to ALL repos for the single user. So comment out for summit, then uncomment afterwards.
    openBrowser('https://github.com/apps/aem-code-sync/installations/select_target')
    const res = await promptConfirm('Did you install the AEM Code Sync bot?')
    if (!res) {
      throw new Error('❌ You must install the AEM Code Sync bot before continuing. Install before running the command again. https://github.com/apps/aem-code-sync/installations/select_target')
    }

    const filePaths = await uploadStarterContent()
    await previewContent(filePaths)
    await publishContent()

    console.log(`🎉 ${boldWhite}Setup complete!${reset} 🎉`)
    console.log(`${boldWhite}Customize your code:${reset} https://github.com/${githubOrg}/${githubRepo}`)
    console.log(`${boldWhite}Edit your content:${reset} https://da.live/#/${githubOrg}/${githubRepo}`)
    console.log(`${boldWhite}Manage your config:${reset} https://da.live/sheet#/${githubOrg}/${githubRepo}/configs-stage`)
    console.log(`${boldWhite}Preview your storefront:${reset} https://main--${githubRepo}--${githubOrg}.aem.page/`)
    meshUrl && console.log(`${boldWhite}Try out your API:${reset} ${meshUrl}`)
    meshDetailsPageURL && console.log(`${boldWhite}View your Mesh details:${reset} ${meshDetailsPageURL}`)
    console.log(`${boldWhite}Run locally:${reset} "aio commerce:dev"`)
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
    org: Flags.string({ char: 'o', description: 'your github org, ie "hlxsites"' }),
    repo: Flags.string({ char: 'r', description: 'your github repo, ie "aem-boilerplate-commerce"' })
  }

  InitCommand.args = {
  }

  InitCommand.description = 'Scaffold your own Adobe Commerce storefront'
  InitCommand.examples = [
    '$ aio commerce:init --org sirugh --repo my-storefront'
  ]
