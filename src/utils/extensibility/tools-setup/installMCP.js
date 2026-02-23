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
import os from 'os'
import { promptConfirm } from '../../prompt.js'
import agentsConfig from '../../../configs/agents.json' with { type: 'json' }

/**
 * The MCP server entry that gets written into every agent's config.
 */
const MCP_SERVER_ENTRY = {
  command: 'node',
  args: ['node_modules/@adobe-commerce/commerce-extensibility-tools/index.js'],
  env: {}
}

/**
 * Resolves a global path template from agents.json by replacing
 * {homedir} and {APPDATA} placeholders with runtime values.
 *
 * @param {string} template - Path template with placeholders
 * @returns {string} Resolved absolute path
 */
function resolveGlobalPath (template) {
  return template
    .replace('{homedir}', os.homedir())
    .replace('{APPDATA}', process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'))
}

/**
 * Returns the MCP file path for the given agent config.
 * For global agents, resolves the OS-specific template from globalPaths.
 * For project-level agents, joins the relative path with targetDir.
 *
 * @param {object} mcpConfig - The mcp section from agents.json
 * @param {string} targetDir - The project root directory
 * @returns {object} { filePath, isGlobal }
 */
function resolveMcpFilePath (mcpConfig, targetDir) {
  if (mcpConfig.global && mcpConfig.globalPaths) {
    const platform = os.platform()
    // Fall back to linux paths for unknown platforms
    const template = mcpConfig.globalPaths[platform] || mcpConfig.globalPaths.linux
    return { filePath: resolveGlobalPath(template), isGlobal: true }
  }
  return { filePath: path.join(targetDir, mcpConfig.path), isGlobal: false }
}

/**
 * Generates a TOML MCP config string for OpenAI Codex.
 *
 * @returns {string} TOML configuration for the commerce-extensibility MCP server
 */
function generateTomlConfig () {
  return `[mcp_servers.commerce-extensibility]
command = "node"
args = ["node_modules/@adobe-commerce/commerce-extensibility-tools/index.js"]
`
}

/**
 * Writes or merges a JSON MCP config file.
 * If the file exists, merges the commerce-extensibility server entry
 * into the existing config under the specified top-level key.
 *
 * @param {string} filePath - Absolute path to the MCP config file
 * @param {string} topKey - The top-level JSON key (e.g. 'mcpServers', 'servers')
 * @param {boolean} isGlobal - Whether this is a global config file
 * @param {boolean} force - If true, skip confirmation prompts and overwrite
 * @returns {Promise<boolean>} true if written successfully, false if user cancelled
 */
async function writeJsonMcpConfig (filePath, topKey, isGlobal, force) {
  let existingConfig = {}

  if (fs.existsSync(filePath)) {
    if (!force) {
      const label = isGlobal ? `Global MCP config already exists at ${filePath}` : 'MCP config already exists in the target directory'
      const shouldOverride = await promptConfirm(
        `${label}. Do you want to merge the commerce-extensibility server into it?`
      )
      if (!shouldOverride) {
        return false
      }
    }

    try {
      existingConfig = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    } catch {
      // If the file is malformed, start fresh
      console.log('⚠️  Existing MCP config could not be parsed. Creating a new one.')
      existingConfig = {}
    }
  }

  // Merge the server entry under the top-level key
  if (!existingConfig[topKey]) {
    existingConfig[topKey] = {}
  }
  existingConfig[topKey]['commerce-extensibility'] = { ...MCP_SERVER_ENTRY }

  // Ensure parent directory exists
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(filePath, JSON.stringify(existingConfig, null, 2))
  return true
}

/**
 * Writes or appends a TOML MCP config for OpenAI Codex.
 *
 * @param {string} filePath - Absolute path to the .codex/config.toml file
 * @param {boolean} force - If true, skip confirmation prompts and overwrite
 * @returns {Promise<boolean>} true if written successfully, false if user cancelled
 */
async function writeTomlMcpConfig (filePath, force) {
  const tomlEntry = generateTomlConfig()

  if (fs.existsSync(filePath)) {
    const existingContent = fs.readFileSync(filePath, 'utf8')

    // Check if commerce-extensibility is already configured
    if (existingContent.includes('[mcp_servers.commerce-extensibility]')) {
      if (!force) {
        const shouldOverride = await promptConfirm(
          'commerce-extensibility MCP server already exists in .codex/config.toml. Do you want to override it?'
        )
        if (!shouldOverride) {
          return false
        }
      }

      // Replace existing commerce-extensibility block
      const updated = existingContent.replace(
        /\[mcp_servers\.commerce-extensibility][^[]*(?=\[|$)/s,
        tomlEntry
      )
      fs.writeFileSync(filePath, updated)
      return true
    }

    // Append to existing file
    fs.writeFileSync(filePath, existingContent.trimEnd() + '\n\n' + tomlEntry)
    return true
  }

  // Create new file
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, tomlEntry)
  return true
}

/**
 * Installs MCP configuration for the selected coding agent.
 *
 * For agents with project-level MCP support, writes the config to the project directory.
 * For agents with global-only MCP (Windsurf, Cline), writes to the global config path.
 * For OpenAI Codex, generates TOML format config.
 * For "Other", prints the config snippet for the user to add manually.
 *
 * @param {string} targetDir - The project root directory
 * @param {string} agentKey - The agent key from agents.json, or 'Other'
 * @param {object} [options] - Options
 * @param {boolean} [options.force] - If true, skip confirmation prompts and overwrite existing configs
 */
export async function installMCP (targetDir, agentKey, options = {}) {
  const force = options.force || false
  if (agentKey === 'Other') {
    console.log('\n📋 MCP server configuration for your coding agent:')
    console.log(JSON.stringify({
      'commerce-extensibility': MCP_SERVER_ENTRY
    }, null, 2))
    console.log('\n   Please add this to your coding agent\'s MCP configuration file.')
    console.log('   Refer to your agent\'s documentation for the correct file location and format.')
    return
  }

  const agentCfg = agentsConfig[agentKey]
  if (!agentCfg || !agentCfg.mcp) {
    console.log(`⚠️  MCP configuration not available for agent "${agentKey}"`)
    return
  }

  const mcpConfig = agentCfg.mcp
  const { filePath, isGlobal } = resolveMcpFilePath(mcpConfig, targetDir)

  if (isGlobal) {
    console.log(`📋 MCP config will be written to global path: ${filePath}`)
  }

  let success = false

  if (mcpConfig.format === 'toml') {
    success = await writeTomlMcpConfig(filePath, force)
  } else {
    success = await writeJsonMcpConfig(filePath, mcpConfig.topKey, isGlobal, force)
  }

  if (success) {
    const location = isGlobal ? filePath : mcpConfig.path
    console.log(`✅ Created MCP configuration: ${location}`)
  } else {
    console.log('⚠️  MCP configuration was not modified.')
  }
}
