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
import { HelloCommand } from '../../../src/commands/PLUGINNAME/hello'
import { jest } from '@jest/globals'

describe('command tests', () => {
  let command

  beforeEach(() => {
    command = new HelloCommand([])
    command.config = {
      runHook: jest.fn().mockResolvedValue({}) // some oclif quirk
    }
  })

  test('hello', async () => {
    const spy = jest.spyOn(command, 'log').mockReturnValue(true)

    command.argv = []
    command.flags = {}
    await expect(command.run()).resolves.not.toThrow()
    expect(spy).toHaveBeenCalledWith('hello world!')
  })

  test('hello jane', async () => {
    const spy = jest.spyOn(command, 'log').mockReturnValue(true)

    command.argv = ['jane']
    await expect(command.run()).resolves.not.toThrow()
    expect(spy).toHaveBeenCalledWith('hello jane!')
  })
})
