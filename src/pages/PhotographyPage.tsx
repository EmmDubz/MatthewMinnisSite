import { MarkdownContent } from '../components/MarkdownContent'
import { PageMeta } from '../components/PageMeta'
import { PhotoGallery } from '../components/PhotoGallery'
import { content } from '../lib/content'

export function PhotographyPage() {
  const photos = Array.isArray(content.photography.data.photos)
    ? content.photography.data.photos
    : []

  return (
    <article className="page-shell photography-page">
      <PageMeta title="Photography" path="/photography" />
      <header className="photography-header">
        <p>Selected work</p>
        <MarkdownContent>{content.photography.body}</MarkdownContent>
        <span>{photos.length.toString().padStart(2, '0')} photographs</span>
      </header>
      <PhotoGallery photos={photos} />
    </article>
  )
}
