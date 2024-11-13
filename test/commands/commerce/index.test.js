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
import { Help } from '@oclif/core'
import { IndexCommand } from '../../../src/commands/commerce'
import { jest } from '@jest/globals'

describe('command tests', () => {
  let command

  beforeEach(() => {
    command = new IndexCommand([])
    command.config = {
      runHook: jest.fn().mockResolvedValue({})
    }
  })

  test('run', async () => {
    command.argv = []
    const spy = jest.spyOn(Help.prototype, 'showHelp').mockReturnValue(true)
    await expect(command.run()).resolves.not.toThrow()
    expect(spy).toHaveBeenCalledWith(['commerce'])
  })
})
