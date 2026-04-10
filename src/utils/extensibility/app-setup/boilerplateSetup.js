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
import fs from 'fs'
import path from 'path'
import Logger from '@adobe/aio-lib-core-logging'

const aioLogger = Logger('commerce:app-setup:boilerplateSetup.js')

const DEFAULT_CONFIG = {
  public: {
    default: {
      'commerce-core-endpoint': '',
      'commerce-endpoint': '',
      headers: {
        cs: {
          'Magento-Customer-Group': 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c',
          'Magento-Store-Code': 'main_website_store',
          'Magento-Store-View-Code': 'default',
          'Magento-Website-Code': 'base',
          'x-api-key': '',
          'Magento-Environment-Id': ''
        }
      }
    }
  }
}

/**
 * Writes the Commerce endpoint into the project's config.json.
 * The Commerce URL should be collected before cloning so all prompts happen upfront.
 *
 * @param {string} projectDir - Project root directory
 * @param {string} graphqlUrl - Commerce GraphQL endpoint URL (already collected)
 */
export async function runBoilerplateSetup (projectDir, graphqlUrl) {
  console.log('\n📋 Configuring AEM Boilerplate Commerce...')

  const configPath = path.join(projectDir, 'config.json')
  let configData

  if (fs.existsSync(configPath)) {
    try {
      configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    } catch {
      console.log('   ⚠ Existing config.json could not be parsed. Creating a new one.')
      configData = structuredClone(DEFAULT_CONFIG)
    }
  } else {
    configData = structuredClone(DEFAULT_CONFIG)
  }

  if (!configData.public) configData.public = {}
  if (!configData.public.default) configData.public.default = {}

  configData.public.default['commerce-core-endpoint'] = graphqlUrl
  configData.public.default['commerce-endpoint'] = graphqlUrl

  fs.writeFileSync(configPath, JSON.stringify(configData, null, 2) + '\n')
  console.log('   ✔ Commerce instance configured in config.json')

  aioLogger.debug('Wrote commerce endpoints to config.json', { graphqlUrl, configPath })
}
