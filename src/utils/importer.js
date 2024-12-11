/** Mostly copied from https://github.com/da-sites/nexter/blob/d1c9efffc5af0092d91aa360e6113900bbb7854c/nx/blocks/importer/index.js#L44-L48 */
import {
  unified,
  remarkParse,
  remarkGridTable,
  toHtml,
  mdast2hast,
  defaultHandlers,
  raw,
  mdast2hastGridTablesHandler
} from '../utils/mdast/dist/index.js'
import { JSDOM } from 'jsdom'
import config from '@adobe/aio-lib-core-config'

/**
 *
 * @param text
 */
export async function getAemHtml (text) {
  const { github: { org, repo } } = config.get()
  if (!org || !repo) throw new Error('Missing Github Org and Repo')
  const dom = mdToDocDom(text)
  const aemHtml = docDomToAemHtml(dom)
  // TODO - do we need fragment finding?
  // await findFragments(aemHtml)
  const fromOrigin = `https://main--${repo}--${org}.aem.live`
  const inner = aemHtml
    .replaceAll('./media', `${fromOrigin}/media`)
    .replaceAll('href="/', `href="${fromOrigin}/`)
  return `
    <body>
      <header></header>
      <main>${inner}</main>
      <footer></footer>
    </body>
  `
}

/**
 *
 * @param text
 */
function toBlockCSSClassNames (text) {
  if (!text) return []
  const names = []
  const idx = text.lastIndexOf('(')
  if (idx >= 0) {
    names.push(text.substring(0, idx))
    names.push(...text.substring(idx + 1).split(','))
  } else {
    names.push(text)
  }

  return names.map((name) => name
    .toLowerCase()
    .replace(/[^0-9a-z]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, ''))
    .filter((name) => !!name)
}

/**
 *
 * @param dom
 */
function convertBlocks (dom) {
  const tables = dom.querySelectorAll('body > table')

  tables.forEach((table) => {
    const rows = [...table.querySelectorAll(':scope > tbody > tr, :scope > thead > tr')]
    const nameRow = rows.shift()
    const divs = rows.map((row) => {
      const cols = row.querySelectorAll(':scope > td, :scope > th')
      // eslint-disable-next-line no-shadow
      const divs = [...cols].map((col) => {
        const { innerHTML } = col
        const div = dom.createElement('div')
        div.innerHTML = innerHTML
        return div
      })
      const div = dom.createElement('div')
      div.append(...divs)
      return div
    })

    const div = dom.createElement('div')
    div.className = toBlockCSSClassNames(nameRow.textContent).join(' ')
    div.append(...divs)
    table.parentElement.replaceChild(div, table)
  })
}

/**
 *
 * @param dom
 */
function makePictures (dom) {
  const imgs = dom.querySelectorAll('img')
  imgs.forEach((img) => {
    const clone = img.cloneNode(true)
    clone.setAttribute('loading', 'lazy')
    clone.src = `${clone.src}?optimize=medium`

    let pic = dom.createElement('picture')

    const srcMobile = dom.createElement('source')
    srcMobile.srcset = clone.src

    const srcTablet = dom.createElement('source')
    srcTablet.srcset = clone.src
    srcTablet.media = '(min-width: 600px)'

    pic.append(srcMobile, srcTablet, clone)

    const hrefAttr = img.getAttribute('href')
    if (hrefAttr) {
      const a = dom.createElement('a')
      a.href = hrefAttr
      const titleAttr = img.getAttribute('title')
      if (titleAttr) {
        a.title = titleAttr
      }
      a.append(pic)
      pic = a
    }

    // Determine what to replace
    const imgParent = img.parentElement
    const imgGrandparent = imgParent.parentElement
    if (imgParent.nodeName === 'P' && imgGrandparent?.childElementCount === 1) {
      imgGrandparent.replaceChild(pic, imgParent)
    } else {
      imgParent.replaceChild(pic, img)
    }
  })
}

/**
 *
 * @param dom
 */
function makeSections (dom) {
  const children = dom.body.querySelectorAll(':scope > *')

  const section = dom.createElement('div')
  const sections = [...children].reduce((acc, child) => {
    if (child.nodeName === 'HR') {
      child.remove()
      acc.push(dom.createElement('div'))
    } else {
      acc[acc.length - 1].append(child)
    }
    return acc
  }, [section])

  dom.body.append(...sections)
}

// Generic docs have table blocks and HRs, but not ProseMirror decorations
/**
 *
 * @param dom
 */
function docDomToAemHtml (dom) {
  convertBlocks(dom)
  makePictures(dom)
  makeSections(dom)

  return dom.body.innerHTML
}

/**
 *
 * @param mdast
 */
function makeHast (mdast) {
  const handlers = { ...defaultHandlers, gridTable: mdast2hastGridTablesHandler() }
  const hast = mdast2hast(mdast, { handlers, allowDangerousHtml: true })
  return raw(hast)
}

/**
 *
 * @param dom
 */
function removeImageSizeHash (dom) {
  const imgs = dom.querySelectorAll('[src*="#width"]')
  imgs.forEach((img) => {
    img.setAttribute('src', img.src.split('#width')[0])
  })
}

/**
 *
 * @param md
 */
function mdToDocDom (md) {
  // convert linebreaks
  const converted = md.replace(/(\r\n|\n|\r)/gm, '\n')

  // convert to mdast
  const mdast = unified()
    .use(remarkParse)
    .use(remarkGridTable)
    .parse(converted)

  const hast = makeHast(mdast)

  let htmlText = toHtml(hast)
  htmlText = htmlText.replaceAll('.hlx.page', '.hlx.live')
  htmlText = htmlText.replaceAll('.aem.page', '.aem.live')

  const dom = new JSDOM(htmlText)
  const document = dom.window.document
  removeImageSizeHash(document)

  return document
}
