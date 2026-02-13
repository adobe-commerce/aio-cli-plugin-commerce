import path from 'path'
import fs from 'fs'

import { promptConfirm } from '../../../../utils/prompt.js'

export class GeminiCLIAgent {
  constructor (targetDir, options = {}) {
    this.targetDir = targetDir
    this.force = options.force || false
  }

  getMCPPath () {
    return path.join(this.targetDir, '.gemini', 'settings.json')
  }

  getRulesPath () {
    return path.join(this.targetDir, 'GEMINI.md')
  }

  async checkIfMCPExists () {
    return fs.existsSync(this.getMCPPath())
  }

  async checkIfRulesExist () {
    return fs.existsSync(this.getRulesPath())
  }

  async checkIfGeminiExists () {
    return fs.existsSync(path.join(this.targetDir, '.gemini'))
  }

  async setupGeminiDirectory () {
    const geminiDir = path.join(this.targetDir, '.gemini')
    if (!fs.existsSync(geminiDir)) {
      fs.mkdirSync(geminiDir, { recursive: true })
      console.log('✅ Created .gemini directory')
    }
  }

  async setupRules () {
    const rulesFilePath = this.getRulesPath()
    const packageRulesDir = path.join(
      this.targetDir,
      'node_modules',
      '@adobe-commerce',
      'commerce-extensibility-tools',
      'rules',
      'gemini'
    )
    if (fs.existsSync(packageRulesDir)) {
      // Copy GEMINI.md from package rules to GEMINI.md at project root
      const geminiInstructions = fs.readFileSync(path.join(packageRulesDir, 'GEMINI.md'), 'utf8')
      fs.writeFileSync(rulesFilePath, geminiInstructions)

      console.log('✅ Gemini instructions copied successfully')
    } else {
      console.log('⚠️  No gemini instructions found in the package')
    }
  }

  async setupMCP () {
    // Check if MCP already exists in target directory
    const exists = await this.checkIfMCPExists()

    if (exists && !this.force) {
      const shouldOverride = await promptConfirm('settings.json already exists in the .gemini directory. Do you want to override it?')

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
    console.log('✅ Created settings.json configuration')
  }

  async setup () {
    // Create .gemini directory if it doesn't exist
    await this.setupGeminiDirectory()

    // Create settings.json
    await this.setupMCP()

    // Copy rules from the package
    await this.setupRules()

    console.log('\n🎉 Commerce Extensibility Tools setup complete!')
    console.log(`📁 Configuration location: ${this.targetDir}`)
    console.log('📋 MCP configuration: .gemini/settings.json')
    console.log('📋 Rules location: GEMINI.md')
    console.log('\nNext steps:')
    console.log('1. Restart Gemini CLI to load the new MCP tools')
    console.log(
      '2. The Commerce App Builder tools should now be available in your Gemini environment'
    )
  }
}
