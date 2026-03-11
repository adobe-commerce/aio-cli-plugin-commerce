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
import { getAndSelectInstances } from '../../accs.js'
import { promptInput } from '../../prompt.js'
import Logger from '@adobe/aio-lib-core-logging'

const aioLogger = Logger('commerce:app-setup:commerceInstance.js')

/** Ensures URL has https, optionally appends /graphql if missing */
function normalizeGraphQLUrl (input) {
  let url = String(input).trim()
  if (!url) return null
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url
  }
  if (/^http:\/\//i.test(url)) {
    url = url.replace(/^http:\/\//i, 'https://')
  }
  if (!/\/graphql\/?$/i.test(url)) {
    url = url.replace(/\/?$/, '/graphql')
  }
  return url
}

/**
 * Gets the Commerce GraphQL endpoint URL.
 * First attempts to fetch and select from the tenant API.
 * If that fails, prompts the user to enter the URL manually.
 *
 * @returns {Promise<string>} The GraphQL endpoint URL
 */
export async function getCommerceGraphQLUrl () {
  try {
    const url = await getAndSelectInstances()
    if (url) {
      return url
    }
  } catch (error) {
    aioLogger.debug('Commerce instance fetch failed, falling back to manual entry:', error)
    console.log('   ⚠️  Could not fetch commerce instances automatically')
    console.log('      You can enter your Commerce GraphQL endpoint URL manually.')
  }

  const manualUrl = await promptInput(
    'Enter your Commerce GraphQL endpoint URL (e.g. https://your-tenant.api.commerce.adobe.com/tenant-id/graphql):'
  )
  const normalized = normalizeGraphQLUrl(manualUrl)
  if (!normalized) {
    throw new Error('Invalid URL. Please provide a valid Commerce GraphQL endpoint URL.')
  }
  return normalized
}
