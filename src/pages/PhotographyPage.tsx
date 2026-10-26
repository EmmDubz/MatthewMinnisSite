import { MarkdownContent } from '../components/MarkdownContent'
import { PageMeta } from '../components/PageMeta'
import { PhotoGallery } from '../components/PhotoGallery'
import { content } from '../lib/content'
import { defaultDescription } from '../lib/site-meta'

export function PhotographyPage() {
  const photos = Array.isArray(content.photography.data.photos)
    ? content.photography.data.photos
    : []

  return (
    <article className="page-shell photography-page">
      <PageMeta title="Photography" path="/photography" description={defaultDescription} />
      <header className="photography-header">
        <MarkdownContent>{content.photography.body}</MarkdownContent>
      </header>
      <PhotoGallery photos={photos} />
    </article>
  )
}
