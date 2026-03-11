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
import ims from '@adobe/aio-lib-ims'
import Logger from '@adobe/aio-lib-core-logging'
import { createSpinner } from '../../spinner.js'

const aioLogger = Logger('commerce:app-setup:loginCheck.js')

/**
 * Verifies the user is logged in by attempting to get an IMS token.
 * If not logged in, throws an error instructing the user to run `aio auth login`.
 *
 * @throws {Error} When user is not logged in
 */
export async function verifyLoggedIn () {
  const spinner = createSpinner('Verifying login...', 0).start()
  try {
    await ims.context.setCurrent('cli')
    await ims.getToken('cli')
    spinner.succeed('Logged in')
  } catch (error) {
    spinner.fail('Not logged in')
    aioLogger.debug('Login check failed:', error)
    throw new Error(
      'You are not logged in. Please run `aio auth login` to authenticate, then run this command again.'
    )
  }
}
