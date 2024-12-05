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
import { openBrowser } from '../../utils/openBrowser.js';
import { runCommand } from '../../utils/runCommand.js'
import { uploadStarterContent } from '../../utils/content.js';
import { org, repo } from '../../utils/constants.js'

const aioLogger = Logger('commerce:hello', { provider: 'debug' });

const DA_FSTAB_CONTENT = `mountpoints:
  /:
    url: https://content.da.live/${org}/${repo}/
    type: markup
`;

export class HelloCommand extends Command {
  async run () {
    const { args, flags } = await this.parse(HelloCommand)
    aioLogger.debug('this is the hello command. flags=%o', flags);

    // 1. create repo from template (gh repo create)
    await runCommand(`gh repo create ${org}/${repo} --template hlxsites/aem-boilerplate-commerce --public`);

    // 2. modify fstab.yaml to point to Dark Alley
    const { stdout: ENCODED_CONTENT } = await runCommand(`echo "${DA_FSTAB_CONTENT.trim()}" | base64 -w0`);
    const { stdout: FILE_SHA } = await runCommand(`gh api repos/${org}/${repo}/contents/fstab.yaml -q .sha`);
    await runCommand(`gh api -X PUT repos/sirugh/my-temp-repo/contents/fstab.yaml -f message="update fstab" -f content="${ENCODED_CONTENT.trim()}" -f sha="${FILE_SHA.trim()}"`);

    // 3. install code sync
    this.log('Install the AEM Code Sync bot to your org and repo.');
    // TODO: uncomment when ready (so it doesn't open every time im testing)
    // openBrowser('https://github.com/apps/aem-code-sync/installations/select_target');

    // 4. upload & preview starter content to Dark Alley
    uploadStarterContent();

    // TODO: Use helix admin to preview
    // TODO; https://github.com/adobe/da-live/blob/main/blocks/start/start.js#L77-L115
    // for( each file in dark alley)
    // runCommand('curl POST https://admin.hlx.page/preview/${org}/${repo}/main/${aem-parts}<fileurl>')
    // openBrowser('https://')
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
