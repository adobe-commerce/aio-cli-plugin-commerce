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
import { runCommand } from '../../utils/runCommand.js'

// TODO: allow interactivity, such as to "accept" that you installed the sync bot
// for adobe-summit-l321/322, wont be an issue since the bot is already installed.
// TODO populate with datasources once generated, or allow passing a file/csv
export class BatchCommand extends Command {
  async run () {
    const { args, flags } = await this.parse(BatchCommand)
    // TODO: fake datasources - 15  endpoints to use...
    const datasources = Array(10).fill('https://na1-sandbox.api.commerce.adobe.com/S8LHdXGTfuMfrg6rb7Q5Mm/graphql')

    // TODO: rate limit reset for gh user will be ~ same time as bot reset. so we can use this to delay the bot.
    // gh api \                                                                                                                                                   2566ms  Tue Feb 25 16:20:40 2025
    //     -H "Accept: application/vnd.github+json" \
    //     -H "X-GitHub-Api-Version: 2022-11-28" \
    //     /rate_limit | jq .rate
    // {
    // "limit": 5000,
    // "used": 37,
    // "remaining": 4963,
    // "reset": 1740523308
    // }
    for await (const [index, datasource] of datasources.entries()) {
      const repo = `${flags.repo}-${(index + 1)}`
      try {
        await this.config.runCommand('commerce:init', [
          `--template=${flags.template}`,
          `--repo=${repo}`,
          `--datasource=${datasource}`,
          '--skipMesh'
        ])
        console.log(`Created storefront: ${repo}`)
      } catch (e) {
        console.error(`! Failed to complete run for ${repo}`)
        console.error(e)
      }
    }
  }
}

BatchCommand.description = 'Uses the init tool in bulk'

BatchCommand.flags = {
  // datasource: Flags.string({ char: 'd', description: 'either a datasource url or a file with urls separated by newlines' }),
  template: Flags.string({ char: 't', description: 'the template to use for the storefronts, ie adobe-commerce/ccdm-demo-store" ' }),
  repo: Flags.string({ char: 'r', description: 'the repository name prefix, which will have a count appended to it, ie adobe-commerce-L321/seat' })
}
