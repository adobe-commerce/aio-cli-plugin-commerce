import inquirer from 'inquirer'

/**
 *
 * @param message
 */
export async function promptConfirm (message) {
  const prompt = inquirer.createPromptModule({ output: process.stderr })

  const confirm = await prompt([
    {
      type: 'confirm',
      name: 'res',
      message
    }
  ])

  return confirm.res
}

/**
 *
 * @param message
 */
export async function promptInput (message) {
  const selected = await inquirer.prompt([
    {
      name: 'item',
      message,
      type: 'input'
    }
  ])

  return selected.item
}

/**
 *
 * @param message
 * @param choices
 */
export async function promptSelect (message, choices) {
  const selected = await inquirer.prompt([
    {
      name: 'item',
      message,
      type: 'list',
      choices
    }
  ])

  return selected.item
}
