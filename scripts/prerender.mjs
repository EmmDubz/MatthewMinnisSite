import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
const { render, routes } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Matthew Minnis',
  url: 'https://matthewminnis.co.uk/',
  jobTitle: 'Final-year Mechanical Engineering student',
  description: routes[0].description,
  sameAs: [
    'https://github.com/EmmDubz',
    'https://uk.linkedin.com/in/matthew-minnis-9a66451b2',
  ],
}

const structuredData = `<script type="application/ld+json">${JSON.stringify(person).replace(/</g, '\\u003c')}</script>`

for (const page of routes) {
  const html = inject(applyMeta(template, page), render(page.path))
  const file = page.path === '/' ? resolve(dist, 'index.html') : resolve(dist, page.path.slice(1), 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
  console.log(`Prerendered ${page.path}`)
}

function applyMeta(html, page) {
  const url = `https://matthewminnis.co.uk${page.path}`
  return setTag(html, 'title', page.title)
    .replace('</head>', `    ${structuredData}\n  </head>`)
    .replace(metaContent('name', 'description'), `$1${escapeAttr(page.description)}$2`)
    .replace(metaContent('property', 'og:title'), `$1${escapeAttr(page.title)}$2`)
    .replace(metaContent('property', 'og:description'), `$1${escapeAttr(page.description)}$2`)
    .replace(metaContent('property', 'og:url'), `$1${escapeAttr(url)}$2`)
    .replace(metaContent('name', 'twitter:title'), `$1${escapeAttr(page.title)}$2`)
    .replace(metaContent('name', 'twitter:description'), `$1${escapeAttr(page.description)}$2`)
    .replace(/(<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["'])[\s\S]*?(["'])/i, `$1${escapeAttr(url)}$2`)
}

function inject(html, appHtml) {
  const placeholder = '<div id="root"></div>'
  if (!html.includes(placeholder)) throw new Error('Could not find the root element to prerender')
  return html.replace(placeholder, `<div id="root">${appHtml}</div>`)
}

function metaContent(attribute, key) {
  return new RegExp(
    `(<meta\\b[^>]*\\b${attribute}=["']${key}["'][^>]*\\bcontent=["'])[\\s\\S]*?(["'])`,
    'i',
  )
}

function setTag(html, tag, value) {
  return html.replace(new RegExp(`<${tag}>[\\s\\S]*?</${tag}>`), `<${tag}>${escapeText(value)}</${tag}>`)
}

function escapeAttr(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function escapeText(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
}
