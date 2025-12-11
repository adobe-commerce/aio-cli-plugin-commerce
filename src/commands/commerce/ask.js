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
import { startChat } from '../../utils/docsChat.js'

export class AskCommand extends Command {
  async run () {
    await startChat()
  }
}

AskCommand.flags = {}

AskCommand.args = {}

AskCommand.description = 'Chat with Adobe Commerce documentation powered by AI'
AskCommand.examples = [
  '$ aio commerce ask',
  '$ aio commerce:ask'
]
