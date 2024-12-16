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
import { runCommand } from '../../utils/runCommand.js'
import config from '@adobe/aio-lib-core-config'

import path from 'path'
const aioLogger = Logger('commerce:dev.js')

export class DevCommand extends Command {
  async run () {
    const { args, flags } = await this.parse(DevCommand)
    const org = config.get('github.org')
    const repo = config.get('github.repo')
    await runCommand(`gh repo clone ${org}/${repo}`)
    aioLogger.log(`✅ Cloned https://github.com/${org}/${repo} to ${path.resolve(repo)}`)
    await runCommand(`cd ${repo}; npm i;`)
    runCommand(`cd ${repo}; npm run start;`)
    runCommand(`cd ${repo}; code .;`)
    aioLogger.log('Your site is installed, and running locally at http://localhost:3000/')
    aioLogger.log(`'npm run start' in ${path.resolve(repo)} to run again later.`)
  }
}

DevCommand.flags = {
  // someflag: Flags.string({ char: 'f', description: 'this is some flag' })
}

DevCommand.args = {
  // name: Args.string({ name: 'name', description: 'name to print', required: false })
}

DevCommand.description = 'one command to clone, install, and run the local development server.'
DevCommand.examples = [
  '$ aio commerce:dev'
]
