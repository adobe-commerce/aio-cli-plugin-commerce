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

function tomlPath (dir) {
  return path.join(dir, '.codex', 'config.toml')
}

function writeToml (dir, content) {
  const p = tomlPath(dir)
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, content)
}

function readToml (dir) {
  return fs.readFileSync(tomlPath(dir), 'utf8')
}

function countMatches (str, pattern) {
  return (str.match(pattern) || []).length
}

// ─── tests ──────────────────────────────────────────────────────────────────

describe('installMCP', () => {
  describe('server filtering by starter kit', () => {
    it.each(['integration-starter-kit', 'checkout-starter-kit', undefined])(
      'writes only commerce-extensibility for %s',
      async (kit) => {
        const dir = makeTmpDir()
        await installMCP(dir, 'Cursor', { force: true, starterKitFolder: kit })

        const { mcpServers } = readJson(path.join(dir, '.cursor', 'mcp.json'))
        expect(Object.keys(mcpServers)).toEqual(['commerce-extensibility'])
      }
    )

    it('writes both commerce-extensibility and dropins for aem-boilerplate-commerce', async () => {
      const dir = makeTmpDir()
      await installMCP(dir, 'Cursor', { force: true, starterKitFolder: 'aem-boilerplate-commerce' })

      const { mcpServers } = readJson(path.join(dir, '.cursor', 'mcp.json'))
      expect(mcpServers).toHaveProperty('commerce-extensibility')
      expect(mcpServers).toHaveProperty('dropins')
    })
  })

  describe('JSON config content', () => {
    let mcpServers

    beforeEach(async () => {
      const dir = makeTmpDir()
      await installMCP(dir, 'Cursor', { force: true, starterKitFolder: 'aem-boilerplate-commerce' })
      mcpServers = readJson(path.join(dir, '.cursor', 'mcp.json')).mcpServers
    })

    it('commerce-extensibility runs via node from node_modules', () => {
      expect(mcpServers['commerce-extensibility'].command).toBe('node')
      expect(mcpServers['commerce-extensibility'].args[0]).toContain('commerce-extensibility-tools')
    })

    it('dropins runs via npx --yes (non-interactive, safe for MCP hosts)', () => {
      expect(mcpServers.dropins.command).toBe('npx')
      expect(mcpServers.dropins.args).toContain('--yes')
      expect(mcpServers.dropins.args).toContain('@dropins/mcp')
    })

    it('merges new entries without removing pre-existing keys', async () => {
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
    it.each([
      ['aem-boilerplate-commerce', true],
      ['integration-starter-kit', false]
    ])('creates correct blocks for %s', async (kit, expectDropins) => {
      const dir = makeTmpDir()
      await installMCP(dir, 'OpenAI Codex', { force: true, starterKitFolder: kit })

      const toml = readToml(dir)
      expect(toml).toContain('[mcp_servers.commerce-extensibility]')
      if (expectDropins) {
        expect(toml).toContain('[mcp_servers.dropins]')
      } else {
        expect(toml).not.toContain('[mcp_servers.dropins]')
      }
    })

    it('appends to an existing file with unrelated sections', async () => {
      const dir = makeTmpDir()
      writeToml(dir, '[some_other_section]\nkey = "value"\n')

      await installMCP(dir, 'OpenAI Codex', { force: true, starterKitFolder: 'aem-boilerplate-commerce' })

      const toml = readToml(dir)
      expect(toml).toContain('[some_other_section]')
      expect(toml).toContain('[mcp_servers.commerce-extensibility]')
      expect(toml).toContain('[mcp_servers.dropins]')
    })

    it('replaces an existing block without duplicating it', async () => {
      const dir = makeTmpDir()
      writeToml(dir, [
        '[mcp_servers.commerce-extensibility]',
        'command = "node"',
        'args = ["old/path.js"]',
        ''
      ].join('\n'))

      await installMCP(dir, 'OpenAI Codex', { force: true, starterKitFolder: 'integration-starter-kit' })

      const toml = readToml(dir)
      expect(countMatches(toml, /\[mcp_servers\.commerce-extensibility\]/g)).toBe(1)
      expect(toml).not.toContain('old/path.js')
      expect(toml).toContain('commerce-extensibility-tools')
    })

    it('replaces both blocks without duplicating them', async () => {
      const dir = makeTmpDir()
      writeToml(dir, [
        '[mcp_servers.commerce-extensibility]',
        'command = "node"',
        'args = ["old/path.js"]',
        '',
        '[mcp_servers.dropins]',
        'command = "npx"',
        'args = ["old-dropins-pkg"]',
        ''
      ].join('\n'))

      await installMCP(dir, 'OpenAI Codex', { force: true, starterKitFolder: 'aem-boilerplate-commerce' })

      const toml = readToml(dir)
      expect(countMatches(toml, /\[mcp_servers\.commerce-extensibility\]/g)).toBe(1)
      expect(countMatches(toml, /\[mcp_servers\.dropins\]/g)).toBe(1)
      expect(toml).not.toContain('old/path.js')
      expect(toml).not.toContain('old-dropins-pkg')
      expect(toml).toContain('@dropins/mcp')
    })

    it('preserves unrelated sections when replacing existing blocks', async () => {
      const dir = makeTmpDir()
      writeToml(dir, [
        '[some_other_section]',
        'key = "value"',
        '',
        '[mcp_servers.commerce-extensibility]',
        'command = "node"',
        'args = ["old/path.js"]',
        ''
      ].join('\n'))

      await installMCP(dir, 'OpenAI Codex', { force: true, starterKitFolder: 'aem-boilerplate-commerce' })

      const toml = readToml(dir)
      expect(toml).toContain('[some_other_section]')
      expect(toml).toContain('key = "value"')
      expect(toml).toContain('[mcp_servers.commerce-extensibility]')
      expect(toml).toContain('[mcp_servers.dropins]')
    })
  })

  describe('"Other" agent', () => {
    let logSpy

    beforeEach(() => { logSpy = jest.spyOn(console, 'log').mockImplementation(() => {}) })
    afterEach(() => { logSpy.mockRestore() })

    it('prints both server entries for aem-boilerplate-commerce', async () => {
      await installMCP('/any', 'Other', { force: true, starterKitFolder: 'aem-boilerplate-commerce' })

      const output = logSpy.mock.calls.map(args => args.join(' ')).join('\n')
      expect(output).toContain('commerce-extensibility')
      expect(output).toContain('dropins')
    })

    it('prints only commerce-extensibility for non-AEM kits', async () => {
      await installMCP('/any', 'Other', { force: true, starterKitFolder: 'integration-starter-kit' })

      const output = logSpy.mock.calls.map(args => args.join(' ')).join('\n')
      expect(output).toContain('commerce-extensibility')
      expect(output).not.toContain('dropins')
    })
  })
})
