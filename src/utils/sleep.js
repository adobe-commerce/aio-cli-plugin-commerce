/**
 * sleeps for a given amount of milliseconds
 * @param timeout
 */
export async function sleep (timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}
