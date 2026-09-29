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
 * Registry of MCP servers to install.
 * Entries without `starterKits` are installed for every project type.
 * Entries with `starterKits` are only installed when the selected starter kit matches.
 */
const MCP_REGISTRY = [
  {
    key: 'commerce-extensibility',
    entry: {
      command: 'node',
      args: ['node_modules/@adobe-commerce/commerce-extensibility-tools/index.js'],
      env: {}
    }
  },
  {
    key: 'dropins',
    entry: {
      command: 'npx',
      args: ['--yes', '@dropins/ai-tools']
    },
    starterKits: ['aem-boilerplate-commerce']
  }
]

/**
 * Returns the subset of MCP_REGISTRY entries applicable to the given starter kit.
 *
 * @param {string} [starterKitFolder] - The selected starter kit folder name
 * @returns {Array<{key: string, entry: object}>}
 */
function getApplicableServers (starterKitFolder) {
  return MCP_REGISTRY.filter(s => !s.starterKits || s.starterKits.includes(starterKitFolder))
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
 * Serializes a single server entry as a TOML block.
 *
 * @param {string} key - The MCP server key (e.g. 'commerce-extensibility')
 * @param {object} entry - The server entry ({ command, args })
 * @returns {string} TOML block for this server
 */
function serverToTomlBlock (key, entry) {
  const argsToml = (entry.args || []).map(a => `"${a}"`).join(', ')
  return `[mcp_servers.${key}]\ncommand = "${entry.command}"\nargs = [${argsToml}]\n`
}

/**
 * Generates a TOML MCP config string for one or more servers.
 *
 * @param {Array<{key: string, entry: object}>} servers
 * @returns {string} TOML configuration block(s)
 */
function generateTomlConfig (servers) {
  return servers.map(({ key, entry }) => serverToTomlBlock(key, entry)).join('\n')
}

/**
 * Writes or merges a JSON MCP config file with all applicable server entries.
 * If the file exists, merges each server entry into the existing config.
 *
 * @param {string} filePath - Absolute path to the MCP config file
 * @param {string} topKey - The top-level JSON key (e.g. 'mcpServers', 'servers')
 * @param {Array<{key: string, entry: object}>} servers - Servers to write
 * @param {boolean} isGlobal - Whether this is a global config file
 * @param {boolean} force - If true, skip confirmation prompts and overwrite
 * @returns {Promise<boolean>} true if written successfully, false if user cancelled
 */
async function writeJsonMcpConfig (filePath, topKey, servers, isGlobal, force) {
  let existingConfig = {}

  if (fs.existsSync(filePath)) {
    if (!force) {
      const label = isGlobal ? `Global MCP config already exists at ${filePath}` : 'MCP config already exists in the target directory'
      const serverKeys = servers.map(s => s.key).join(', ')
      const shouldOverride = await promptConfirm(
        `${label}. Do you want to merge the MCP server entries (${serverKeys}) into it?`
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

  // Merge each server entry under the top-level key
  if (!existingConfig[topKey]) {
    existingConfig[topKey] = {}
  }
  for (const { key, entry } of servers) {
    existingConfig[topKey][key] = { ...entry }
  }

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
 * Handles multiple server entries, replacing existing blocks and appending new ones.
 *
 * @param {string} filePath - Absolute path to the .codex/config.toml file
 * @param {Array<{key: string, entry: object}>} servers - Servers to write
 * @param {boolean} force - If true, skip confirmation prompts and overwrite
 * @returns {Promise<boolean>} true if written successfully, false if user cancelled
 */
async function writeTomlMcpConfig (filePath, servers, force) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8')

    const alreadyPresent = servers.filter(s => content.includes(`[mcp_servers.${s.key}]`))
    if (alreadyPresent.length > 0 && !force) {
      const keys = alreadyPresent.map(s => s.key).join(', ')
      const shouldOverride = await promptConfirm(
        `MCP server(s) "${keys}" already exist in .codex/config.toml. Do you want to override them?`
      )
      if (!shouldOverride) {
        return false
      }
    }

    // Replace existing blocks and collect new ones to append
    const toAppend = []
    for (const server of servers) {
      const tomlBlock = generateTomlConfig([server])
      if (content.includes(`[mcp_servers.${server.key}]`)) {
        // Match from the section header to the start of the next section or end of string.
        // [^]* matches any character including newlines; *? stops lazily at the next \n[ or end.
        const blockPattern = new RegExp(`\\[mcp_servers\\.${server.key}\\][^]*?(?=\\n\\[|$)`)
        content = content.replace(blockPattern, tomlBlock.trimEnd())
      } else {
        toAppend.push(tomlBlock)
      }
    }

    const appended = toAppend.length > 0 ? '\n' + toAppend.join('\n') : ''
    fs.writeFileSync(filePath, content.trimEnd() + appended)
    return true
  }

  // Create new file
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, generateTomlConfig(servers))
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
 * @param {string} [options.starterKitFolder] - Starter kit folder name used to filter applicable MCP servers
 */
export async function installMCP (targetDir, agentKey, options = {}) {
  const { force = false, starterKitFolder } = options
  const servers = getApplicableServers(starterKitFolder)

  if (agentKey === 'Other') {
    const mcpEntries = Object.fromEntries(servers.map(s => [s.key, s.entry]))
    console.log('\n📋 MCP server configuration for your coding agent:')
    console.log(JSON.stringify(mcpEntries, null, 2))
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
    success = await writeTomlMcpConfig(filePath, servers, force)
  } else {
    success = await writeJsonMcpConfig(filePath, mcpConfig.topKey, servers, isGlobal, force)
  }

  if (success) {
    const location = isGlobal ? filePath : mcpConfig.path
    console.log(`✅ Created MCP configuration: ${location}`)
  } else {
    console.log('⚠️  MCP configuration was not modified.')
  }
}
