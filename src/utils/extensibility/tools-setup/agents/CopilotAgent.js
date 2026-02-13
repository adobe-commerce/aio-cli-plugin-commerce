import path from 'path'
import fs from 'fs'

import { promptConfirm } from '../../../../utils/prompt.js'

export class CopilotAgent {
  constructor (targetDir, options = {}) {
    this.targetDir = targetDir
    this.force = options.force || false
  }

  getMCPPath () {
    return path.join(this.targetDir, '.vscode', 'mcp.json')
  }

  getRulesPath () {
    return path.join(this.targetDir, '.github', 'copilot-instructions.md')
  }

  async checkIfMCPExists () {
    return fs.existsSync(this.getMCPPath())
  }

  async checkIfRulesExist () {
    return fs.existsSync(this.getRulesPath())
  }

  async checkIfGithubExists () {
    return fs.existsSync(path.join(this.targetDir, '.github'))
  }

  async checkIfVSCodeExists () {
    return fs.existsSync(path.join(this.targetDir, '.vscode'))
  }

  async setupVSCodeDirectory () {
    const vscodeDir = path.join(this.targetDir, '.vscode')
    if (!fs.existsSync(vscodeDir)) {
      fs.mkdirSync(vscodeDir, { recursive: true })
      console.log('✅ Created .vscode directory')
    }
  }

  async setupGithubDirectory () {
    const githubDir = path.join(this.targetDir, '.github')
    if (!fs.existsSync(githubDir)) {
      fs.mkdirSync(githubDir, { recursive: true })
      console.log('✅ Created .github directory')
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
      'copilot'
    )
    if (fs.existsSync(packageRulesDir)) {
      // Copy COPILOT.md from package rules to .github/copilot-instructions.md
      const copilotInstructions = fs.readFileSync(path.join(packageRulesDir, 'COPILOT.md'), 'utf8')
      fs.writeFileSync(rulesFilePath, copilotInstructions)

      console.log('✅ Copilot instructions copied successfully')
    } else {
      console.log('⚠️  No copilot instructions found in the package')
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
      servers: {
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
    // Create .vscode and .github directories if they don't exist
    await this.setupVSCodeDirectory()
    await this.setupGithubDirectory()

    // Create mcp.json
    await this.setupMCP()

    // Copy rules from the package
    await this.setupRules()

    console.log('\n🎉 Commerce Extensibility Tools setup complete!')
    console.log(`📁 Configuration location: ${this.targetDir}`)
    console.log('📋 MCP configuration: .vscode/mcp.json')
    console.log('📋 Rules location: .github/rules/')
    console.log('\nNext steps:')
    console.log('1. Restart VSCode to load the new MCP tools')
    console.log(
      '2. The Commerce App Builder tools should now be available in your VSCode environment'
    )
  }
}
