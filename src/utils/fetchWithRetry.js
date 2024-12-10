/**
 *
 * @param url
 * @param options
 * @param retries
 */
export async function fetchWithRetry (url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        return response
      }
      throw new Error('Fetch failed')
    } catch (error) {
      if (i === retries - 1) {
        throw error
      }
    }
  }
}
