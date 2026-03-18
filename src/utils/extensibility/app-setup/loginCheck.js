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
 * If not logged in, triggers the browser-based login flow automatically.
 *
 * @throws {Error} When login fails or is cancelled
 */
export async function verifyLoggedIn () {
  const spinner = createSpinner('Verifying login...', 0).start()
  try {
    await ims.context.setCurrent('cli')
    await ims.context.setCli({ 'cli.bare-output': false }, false, true)
    await ims.getToken('cli')
    spinner.succeed('Logged in')
  } catch (error) {
    spinner.fail('Not logged in')
    aioLogger.debug('Login check failed:', error)
    throw new Error(
      'Login failed. Please try running `aio auth login --force` manually, then run this command again.'
    )
  }
}
