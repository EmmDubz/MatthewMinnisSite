import { CopyEmailButton } from '../components/CopyEmailButton'
import { MarkdownContent } from '../components/MarkdownContent'
import { PageMeta } from '../components/PageMeta'
import { content } from '../lib/content'
import { defaultDescription } from '../lib/site-meta'

export function CvPage() {
  return (
    <article className="page-shell cv-page">
        <PageMeta title="CV" path="/cv" description={defaultDescription} />
      <header className="page-header">
        <p>Matthew Minnis / CV</p>
        <CopyEmailButton />
      </header>
      <MarkdownContent className="cv-content">{content.cv.body}</MarkdownContent>
    </article>
  )
}
