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
import { initialization } from '../../utils/initialization.js'
import config from '@adobe/aio-lib-core-config'
import { modifyConfig } from '../../utils/configs.js'
export class TestCommand extends Command {
  async run () {
    const { args, flags } = await this.parse(TestCommand)
    await initialization(args, flags)
    // Example config contents, ie "prodConfig" after fetch
    // {
    //   total: 18,
    //   offset: 0,
    //   limit: 18,
    //   data: [
    //     {
    //       key: 'commerce-endpoint',
    //       value: 'https://www.aemshop.net/cs-graphql'
    //     },
    //     {
    //       key: 'commerce-environment-id',
    //       value: 'f38a0de0-764b-41fa-bd2c-5bc2f3c7b39a'
    //     },
    //     { key: 'commerce-website-code', value: 'base' },
    //     { key: 'commerce-store-view-code', value: 'default' },
    //     { key: 'commerce-store-code', value: 'main_website_store' },
    //     {
    //       key: 'commerce-customer-group',
    //       value: 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c'
    //     },
    //     {
    //       key: 'commerce-x-api-key',
    //       value: '4dfa19c9fe6f4cccade55cc5b3da94f7'
    //     },
    //     {
    //       key: 'commerce-core-endpoint',
    //       value: 'https://www.aemshop.net/graphql'
    //     },
    //     { key: 'commerce-root-category-id', value: '2' },
    //     { key: 'commerce-environment', value: 'Production' },
    //     { key: 'commerce-store-id', value: '1' },
    //     { key: 'commerce-store-name', value: 'Main Website Store' },
    //     { key: 'commerce-store-url', value: 'https://www.aemshop.net/' },
    //     { key: 'commerce-store-view-id', value: '1' },
    //     { key: 'commerce-store-view-name', value: 'Default Store View' },
    //     { key: 'commerce-website-id', value: '1' },
    //     { key: 'commerce-website-name', value: 'Main Website' },
    //     { key: 'commerce-base-currency-code', value: 'USD' }
    //   ],
    //   ':type': 'sheet'
    // }
    const prodConfig = await fetch('https://main--aem-boilerplate-commerce--hlxsites.aem.live/configs.json').then(async (res) => {
      const text = await res.text()
      return text
    })

    const config = modifyConfig(prodConfig)
    console.log(config)
  }
}

TestCommand.description = 'Spin up an Adobe Commerce Storefront on EDS using this CLI tool'
