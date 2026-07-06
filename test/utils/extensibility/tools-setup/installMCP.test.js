/*
Copyright 2026 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { jest } from '@jest/globals'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { installMCP } from '../../../../src/utils/extensibility/tools-setup/installMCP.js'

// All tests use force: true so promptConfirm is never invoked — no mock needed.

// ─── helpers ────────────────────────────────────────────────────────────────

function makeTmpDir () {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'installMCP-test-'))
}

function readJson (filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

// ─── tests ──────────────────────────────────────────────────────────────────

describe('installMCP', () => {
  describe('server filtering by starter kit', () => {
    it('writes only commerce-extensibility for integration-starter-kit', async () => {
      const dir = makeTmpDir()
      await installMCP(dir, 'Cursor', { force: true, starterKitFolder: 'integration-starter-kit' })

      const config = readJson(path.join(dir, '.cursor', 'mcp.json'))
      expect(Object.keys(config.mcpServers)).toEqual(['commerce-extensibility'])
    })

    it('writes only commerce-extensibility for checkout-starter-kit', async () => {
      const dir = makeTmpDir()
      await installMCP(dir, 'Cursor', { force: true, starterKitFolder: 'checkout-starter-kit' })

      const config = readJson(path.join(dir, '.cursor', 'mcp.json'))
      expect(Object.keys(config.mcpServers)).toEqual(['commerce-extensibility'])
    })

    it('writes both commerce-extensibility and dropins for aem-boilerplate-commerce', async () => {
      const dir = makeTmpDir()
      await installMCP(dir, 'Cursor', { force: true, starterKitFolder: 'aem-boilerplate-commerce' })

      const config = readJson(path.join(dir, '.cursor', 'mcp.json'))
      expect(config.mcpServers).toHaveProperty('commerce-extensibility')
      expect(config.mcpServers).toHaveProperty('dropins')
    })

    it('writes only commerce-extensibility when no starter kit is provided', async () => {
      const dir = makeTmpDir()
      await installMCP(dir, 'Cursor', { force: true })

      const config = readJson(path.join(dir, '.cursor', 'mcp.json'))
      expect(Object.keys(config.mcpServers)).toEqual(['commerce-extensibility'])
    })
  })

  describe('JSON config content', () => {
    it('commerce-extensibility entry runs via node from node_modules', async () => {
      const dir = makeTmpDir()
      await installMCP(dir, 'Cursor', { force: true, starterKitFolder: 'aem-boilerplate-commerce' })

      const { mcpServers } = readJson(path.join(dir, '.cursor', 'mcp.json'))
      expect(mcpServers['commerce-extensibility'].command).toBe('node')
      expect(mcpServers['commerce-extensibility'].args[0]).toContain('commerce-extensibility-tools')
    })

    it('dropins entry runs via npx', async () => {
      const dir = makeTmpDir()
      await installMCP(dir, 'Cursor', { force: true, starterKitFolder: 'aem-boilerplate-commerce' })

      const { mcpServers } = readJson(path.join(dir, '.cursor', 'mcp.json'))
      expect(mcpServers.dropins.command).toBe('npx')
      expect(mcpServers.dropins.args).toContain('@dropins/mcp')
    })

    it('merges new entries into an existing config without removing other keys', async () => {
      const dir = makeTmpDir()
      const configPath = path.join(dir, '.cursor', 'mcp.json')
      fs.mkdirSync(path.dirname(configPath), { recursive: true })
      fs.writeFileSync(configPath, JSON.stringify({
        mcpServers: { 'my-custom-server': { command: 'node', args: ['custom.js'] } }
      }))

      await installMCP(dir, 'Cursor', { force: true, starterKitFolder: 'aem-boilerplate-commerce' })

      const config = readJson(configPath)
      expect(config.mcpServers).toHaveProperty('my-custom-server')
      expect(config.mcpServers).toHaveProperty('commerce-extensibility')
      expect(config.mcpServers).toHaveProperty('dropins')
    })
  })

  describe('TOML config (OpenAI Codex)', () => {
    it('writes both server blocks for aem-boilerplate-commerce', async () => {
      const dir = makeTmpDir()
      await installMCP(dir, 'OpenAI Codex', { force: true, starterKitFolder: 'aem-boilerplate-commerce' })

      const toml = fs.readFileSync(path.join(dir, '.codex', 'config.toml'), 'utf8')
      expect(toml).toContain('[mcp_servers.commerce-extensibility]')
      expect(toml).toContain('[mcp_servers.dropins]')
    })

    it('writes only commerce-extensibility block for integration-starter-kit', async () => {
      const dir = makeTmpDir()
      await installMCP(dir, 'OpenAI Codex', { force: true, starterKitFolder: 'integration-starter-kit' })

      const toml = fs.readFileSync(path.join(dir, '.codex', 'config.toml'), 'utf8')
      expect(toml).toContain('[mcp_servers.commerce-extensibility]')
      expect(toml).not.toContain('[mcp_servers.dropins]')
    })
  })

  describe('"Other" agent', () => {
    it('prints both server entries for aem-boilerplate-commerce', async () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {})
      await installMCP('/any', 'Other', { force: true, starterKitFolder: 'aem-boilerplate-commerce' })

      const output = spy.mock.calls.map(args => args.join(' ')).join('\n')
      expect(output).toContain('commerce-extensibility')
      expect(output).toContain('dropins')
      spy.mockRestore()
    })

    it('prints only commerce-extensibility for non-AEM kits', async () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {})
      await installMCP('/any', 'Other', { force: true, starterKitFolder: 'integration-starter-kit' })

      const output = spy.mock.calls.map(args => args.join(' ')).join('\n')
      expect(output).toContain('commerce-extensibility')
      expect(output).not.toContain('dropins')
      spy.mockRestore()
    })
  })
})
