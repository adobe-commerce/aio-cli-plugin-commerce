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
