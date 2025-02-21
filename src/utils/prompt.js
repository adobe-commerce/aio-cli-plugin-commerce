import Logger from '@adobe/aio-lib-core-logging'
import { confirm, input, search } from '@inquirer/prompts'
const aioLogger = Logger('commerce:prompt.js')
/**
 *
 * @param message
 */
export async function promptConfirm (message) {
  const res = await confirm({ message })
  aioLogger.debug(`promptConfirm: ${res}`)
  return res
}

/**
 *
 * @param message
 */
export async function promptInput (message) {
  const res = await input({ message })
  aioLogger.debug(`promptInput: ${res}`)
  return res
}

/**
 *
 * @param message
 * @param choices
 */
export async function promptSelect (message, choices) {
  const res = await search({
    message,
    source: async (input, { signal }) => {
      if (!input) { return choices }

      // return fuzzy search results from the choices array
      const fuzzyResults = choices.filter(choice => choice.toLowerCase().includes(input.toLowerCase()))
      return fuzzyResults
    }
  })
  aioLogger.debug(`promptSelect: ${res}`)
  return res
}
