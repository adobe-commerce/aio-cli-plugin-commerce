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
const aioLogger = Logger('commerce:hello', { provider: 'debug' })

export class HelloCommand extends Command {
  async run () {
    const { args, flags } = await this.parse(HelloCommand)
    aioLogger.debug('this is the hello command. flags=%o', flags)

    this.log(`hello ${args.name || 'world'}!`)
  }
}

HelloCommand.flags = {
  someflag: Flags.string({ char: 'f', description: 'this is some flag' })
}

HelloCommand.args = {
  name: Args.string({ name: 'name', description: 'name to print', required: false })
}

HelloCommand.description = 'A hello world sample command.'
HelloCommand.examples = [
  '$ aio commerce:hello myself -f myflag'
]
