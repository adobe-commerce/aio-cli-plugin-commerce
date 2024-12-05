export const
  SOURCE_CONTENT_ZIP_URL = 'https://github.com/hlxsites/aem-boilerplate-commerce/releases/download/starter-content/starter-content-commerce.zip'
/**
 *
 * @param org
 * @param repo
 */
export function getDaSourceUrl (org, repo) { return `https://admin.da.live/source/${org}/${repo}` }; // PUT to push content

export const org = 'sirugh'
export const repo = 'my-temp-repo'
