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
import agentsConfig from '../../../configs/agents.json' with { type: 'json' }

/**
 * Recursively copies a directory from src to dest.
 * Creates the destination directory if it doesn't exist.
 *
 * @param {string} src - Source directory path
 * @param {string} dest - Destination directory path
 */
function copyDirRecursive (src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

/**
 * Installs agent skills from the selected starter kit into the project.
 *
 * This function:
 * 1. Copies AGENTS.md to the project root
 * 2. Copies the skills/ directory to the agent-specific skills path
 *    (or to ./skills/ in the project root for the "Other" option)
 *
 * @param {string} targetDir - The project root directory
 * @param {string} starterKitFolder - The starter kit folder name (e.g. 'integration-starter-kit')
 * @param {string} agentKey - The agent key from AGENTS_CONFIG, or 'Other'
 */
export async function installSkills (targetDir, starterKitFolder, agentKey) {
  const distPath = path.join(
    targetDir,
    'node_modules',
    '@adobe-commerce',
    'commerce-extensibility-tools',
    'dist',
    starterKitFolder
  )

  if (!fs.existsSync(distPath)) {
    console.log(`⚠️  No skills found for starter kit "${starterKitFolder}" in the package`)
    return
  }

  // 1. Copy AGENTS.md to project root
  const agentsMdSrc = path.join(distPath, 'AGENTS.md')
  if (fs.existsSync(agentsMdSrc)) {
    const agentsMdDest = path.join(targetDir, 'AGENTS.md')
    fs.copyFileSync(agentsMdSrc, agentsMdDest)
    console.log('📋 Copied AGENTS.md to project root')
  } else {
    console.log('⚠️  No AGENTS.md found in the starter kit')
  }

  // 2. Copy skills to the agent-specific skills directory
  const skillsSrc = path.join(distPath, 'skills')
  if (!fs.existsSync(skillsSrc)) {
    console.log('⚠️  No skills directory found in the starter kit')
    return
  }

  let skillsDest
  if (agentKey === 'Other') {
    skillsDest = path.join(targetDir, 'skills')
  } else {
    const agentCfg = agentsConfig[agentKey]
    skillsDest = path.join(targetDir, agentCfg.skillsPath)
  }

  // Create skills destination directory
  fs.mkdirSync(skillsDest, { recursive: true })

  // Copy each skill folder into the destination
  const skillFolders = fs.readdirSync(skillsSrc, { withFileTypes: true })
  for (const entry of skillFolders) {
    if (entry.isDirectory()) {
      const srcSkillPath = path.join(skillsSrc, entry.name)
      const destSkillPath = path.join(skillsDest, entry.name)
      copyDirRecursive(srcSkillPath, destSkillPath)
      console.log(`📋 Copied skill: ${entry.name}`)
    }
  }

  console.log('✅ Skills copied successfully')

  if (agentKey === 'Other') {
    console.log('\n⚠️  Skills have been copied to the ./skills/ directory in your project root.')
    console.log('   Please refer to your coding agent\'s documentation to configure the skills folder path.')
    console.log('   You may need to move the skills folder to a location your agent recognizes.')
  }
}
