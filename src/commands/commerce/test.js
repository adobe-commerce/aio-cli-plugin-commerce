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
import { Command, Help } from '@oclif/core'
import { spawn } from 'child_process'
import { openSync } from 'fs'


export class TestCommand extends Command {
  async run () {
    const { args } = this.parse(TestCommand)

    // Spawn a detached child process to run the background task
    try {
      const out = openSync('./mesh-verify.log', 'w')
      const err = openSync('./mesh-verify.log', 'a')
      const childProcess = spawn(
        'aio',
        ['commerce:mesh-verify'],
        {
          detached: true,
          stdio: ['ignore', out, err]
        }
      )
      // Detach from the parent process
      childProcess.unref()
    } catch (error) {}
  }
}

TestCommand.description =
    "Spin up an Adobe Commerce Storefront on EDS using this CLI tool";
