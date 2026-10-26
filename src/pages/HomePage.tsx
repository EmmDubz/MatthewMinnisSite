import { Link } from 'react-router-dom'

import { CopyEmailButton } from '../components/CopyEmailButton'
import { MarkdownContent } from '../components/MarkdownContent'
import { PageMeta } from '../components/PageMeta'
import { RecordWidget } from '../components/RecordWidget'
import { content } from '../lib/content'
import { defaultDescription } from '../lib/site-meta'

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="M2 8h12m-4-4 4 4-4 4" />
    </svg>
  )
}

export function HomePage() {
  return (
    <>
      <PageMeta description={defaultDescription} />
      <section className="hero-section">
        <MarkdownContent className="hero-copy">{content.home.body}</MarkdownContent>
        <div className="hero-links">
          <CopyEmailButton />
          <a href="https://github.com/EmmDubz" rel="noreferrer" target="_blank">
            GitHub <ArrowIcon />
          </a>
          <a
            href="https://uk.linkedin.com/in/matthew-minnis-9a66451b2"
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn <ArrowIcon />
          </a>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <span>M</span>
          <span>M</span>
        </div>
      </section>

      <section className="editorial-section content-section" id="experience">
        <div className="section-number">01</div>
        <MarkdownContent className="timeline-content">{content.experience.body}</MarkdownContent>
      </section>

      <section className="editorial-section content-section" id="projects">
        <div className="section-number">02</div>
        <MarkdownContent className="timeline-content">{content.projects.body}</MarkdownContent>
      </section>

      <section className="editorial-section split-section">
        <div className="section-number">03</div>
        <div className="interest-layout">
          <MarkdownContent>{content.interests.body}</MarkdownContent>
          <Link className="text-link" to="/photography">
            Photography
            <ArrowIcon />
          </Link>
        </div>
      </section>

      <RecordWidget />

      <section className="cv-cta">
        <p>Curriculum Vitae</p>
        <Link to="/cv" aria-label="View curriculum vitae">
          View CV
          <ArrowIcon />
        </Link>
      </section>
    </>
  )
}
