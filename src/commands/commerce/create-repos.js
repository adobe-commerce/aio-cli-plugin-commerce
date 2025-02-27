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
import { Command } from '@oclif/core'
import { createRepo } from '../../utils/github.js'
import config from '@adobe/aio-lib-core-config'
/**
 * Clones github repos in preparation of content and mesh provisioning with aio commerce init --skipGit
 */
export class CreateRepos extends Command {
  async run () {
    console.log('Starting to create repos...')
    // const { args, flags } = await this.parse(CreateRepos)
    const start = 1
    const end = 100
    const owner = 'adobe-summit-L322' // adobe-summit-L321
    const repoPrefix = 'seat'
    const templateOrg = 'adobe-commerce'
    const templateRepo = 'adobe-demo-store'

    for (let i = start; i <= end; i++) {
      const repo = `${repoPrefix}-${i}`
      config.set('commerce.github.org', owner)
      config.set('commerce.github.repo', repo)
      config.set('commerce.template.org', templateOrg)
      config.set('commerce.template.repo', templateRepo)
      try {
        await createRepo()
      } catch (e) {
        console.error(`! Failed to complete run for "${repo}". Skipping.`)
        console.error(e)
      }
    }
  }
}

CreateRepos.description = 'Uses the init tool in bulk'

CreateRepos.flags = {
  // template: Flags.string({ char: 't', description: 'the template to use for the storefronts, ie adobe-commerce/ccdm-demo-store" ' }),
  // repo: Flags.string({ char: 'r', description: 'the repository name prefix, which will have a count appended to it, ie adobe-commerce-L321/seat' })
}
