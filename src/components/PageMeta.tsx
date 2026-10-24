import { useEffect } from 'react'

type PageMetaProps = {
  title?: string
  path?: string
}

export function PageMeta({ title, path = '/' }: PageMetaProps) {
  useEffect(() => {
    document.title = title ? `${title} | Matthew Minnis` : 'Matthew Minnis'

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    canonical?.setAttribute('href', `https://matthewminnis.co.uk${path}`)
  }, [path, title])

  return null
}
