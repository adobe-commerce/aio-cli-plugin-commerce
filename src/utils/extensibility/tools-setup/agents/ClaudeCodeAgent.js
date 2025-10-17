import path from 'path'
import fs from 'fs'

import { promptConfirm } from '../../../../utils/prompt.js'

export class ClaudeCodeAgent {
  constructor (targetDir) {
    this.targetDir = targetDir
  }

  getMCPPath () {
    return path.join(this.targetDir, '.mcp.json')
  }

  getRulesPath () {
    return path.join(this.targetDir, 'CLAUDE.md')
  }

  async checkIfMCPExists () {
    return fs.existsSync(this.getMCPPath())
  }

  async checkIfRulesExist () {
    return fs.existsSync(this.getRulesPath())
  }

  async setupRules () {
    const rulesFilePath = this.getRulesPath()
    const packageRulesDir = path.join(
      this.targetDir,
      'node_modules',
      '@adobe-commerce',
      'commerce-extensibility-tools',
      'rules',
      'claude'
    )
    if (fs.existsSync(packageRulesDir)) {
      // Copy CLAUDE.md from package rules to CLAUDE.md at project root
      const claudeInstructions = fs.readFileSync(path.join(packageRulesDir, 'CLAUDE.md'), 'utf8')
      fs.writeFileSync(rulesFilePath, claudeInstructions)

      console.log('✅ Claude instructions copied successfully')
    } else {
      console.log('⚠️  No claude instructions found in the package')
    }
  }

  async setupMCP () {
    // Check if MCP already exists in target directory
    const exists = await this.checkIfMCPExists()

    if (exists) {
      const shouldOverride = await promptConfirm('.mcp.json already exists in the project root. Do you want to override it?')

      if (!shouldOverride) {
        throw new Error('Setup cancelled. MCP config was not overridden.')
      }
    }

    const mcpConfig = {
      mcpServers: {
        'commerce-extensibility': {
          command: 'node',
          args: ['node_modules/@adobe-commerce/commerce-extensibility-tools/index.js'],
          env: {}
        }
      }
    }
    const mcpJsonPath = this.getMCPPath()
    fs.writeFileSync(mcpJsonPath, JSON.stringify(mcpConfig, null, 2))
    console.log('✅ Created .mcp.json configuration')
  }

  async setup () {
    // Create .mcp.json
    await this.setupMCP()

    // Copy rules from the package
    await this.setupRules()

    console.log('\n🎉 Commerce Extensibility Tools setup complete!')
    console.log(`📁 Configuration location: ${this.targetDir}`)
    console.log('📋 MCP configuration: .mcp.json')
    console.log('📋 Rules location: CLAUDE.md')
    console.log('\nNext steps:')
    console.log('1. Restart Claude to load the new MCP tools')
    console.log(
      '2. The Commerce App Builder tools should now be available in your Claude environment'
    )
  }
}
