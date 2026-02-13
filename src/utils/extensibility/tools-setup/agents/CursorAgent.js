import path from 'path'
import fs from 'fs'

import { promptConfirm } from '../../../../utils/prompt.js'

export class CursorAgent {
  constructor (targetDir, options = {}) {
    this.targetDir = targetDir
    this.force = options.force || false
  }

  getMCPPath () {
    return path.join(this.targetDir, '.cursor', 'mcp.json')
  }

  getRulesPath () {
    return path.join(this.targetDir, '.cursor', 'rules')
  }

  async checkIfMCPExists () {
    return fs.existsSync(this.getMCPPath())
  }

  async checkIfRulesExist () {
    return fs.existsSync(this.getRulesPath())
  }

  async checkIfCursorExists () {
    return fs.existsSync(path.join(this.targetDir, '.cursor'))
  }

  async setupCursorDirectory () {
    const cursorDir = path.join(this.targetDir, '.cursor')

    if (!fs.existsSync(cursorDir)) {
      fs.mkdirSync(cursorDir, { recursive: true })
      console.log('✅ Created .cursor directory')
    }

    // Create rules directory
    const rulesDir = this.getRulesPath()
    if (!fs.existsSync(rulesDir)) {
      fs.mkdirSync(rulesDir, { recursive: true })
      console.log('✅ Created rules directory')
    }
  }

  async setupRules () {
    const rulesDir = this.getRulesPath()
    const packageRulesDir = path.join(
      this.targetDir,
      'node_modules',
      '@adobe-commerce',
      'commerce-extensibility-tools',
      'rules',
      'cursor'
    )
    if (fs.existsSync(packageRulesDir)) {
      // Copy all files from package rules to .cursor/rules
      const copyRules = async () => {
        const files = fs.readdirSync(packageRulesDir)
        for (const file of files) {
          const sourcePath = path.join(packageRulesDir, file)
          const destPath = path.join(rulesDir, file)

          // ignore README.md
          if (file === 'README.md') {
            continue
          }

          if (fs.statSync(sourcePath).isFile()) {
            fs.copyFileSync(sourcePath, destPath)
            console.log(`📋 Copied rule: ${file}`)
          }
        }
      }
      await copyRules()
      console.log('✅ Rules copied successfully')
    } else {
      console.log('⚠️  No rules found in the package')
    }
  }

  async setupMCP () {
    // Check if mcp already exists in target directory
    const exists = await this.checkIfMCPExists()

    if (exists && !this.force) {
      const shouldOverride = await promptConfirm('mcp.json already exists in the target directory. Do you want to override it?')

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
    console.log('✅ Created mcp.json configuration')
  }

  async setup () {
    // Create .cursor directory if it doesn't exist
    await this.setupCursorDirectory()

    // Create mcp.json
    await this.setupMCP()

    // Copy rules from the package
    await this.setupRules()

    console.log('\n🎉 Commerce Extensibility Tools setup complete!')
    console.log(`📁 Configuration location: ${this.targetDir}`)
    console.log('📋 MCP configuration: .cursor/mcp.json')
    console.log('📋 Rules location: .cursor/rules/')
    console.log('\nNext steps:')
    console.log('1. Restart Cursor to load the new MCP tools')
    console.log(
      '2. The Commerce App Builder tools should now be available in your Cursor environment'
    )
  }
}
