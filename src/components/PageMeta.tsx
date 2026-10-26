import { useEffect } from 'react'

import { pageTitle, siteOrigin } from '../lib/site-meta'

type PageMetaProps = {
  title?: string
  path?: string
  description?: string
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  const meta = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  meta?.setAttribute('content', content)
}

export function PageMeta({ title, path = '/', description }: PageMetaProps) {
  useEffect(() => {
    const nextTitle = pageTitle(title)
    const url = `${siteOrigin}${path}`
    document.title = nextTitle

    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', url)
    setMeta('property', 'og:title', nextTitle)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', nextTitle)

    if (!description) return

    setMeta('name', 'description', description)
    setMeta('property', 'og:description', description)
    setMeta('name', 'twitter:description', description)
  }, [description, path, title])

  return null
}
