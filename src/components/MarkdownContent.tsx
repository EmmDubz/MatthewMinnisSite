import { Children, isValidElement, type ReactElement } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MarkdownContentProps = {
  children: string
  className?: string
}

const IMAGE_REGEX = /!\[([^\]]*)\]\(([^"'\s]+)(?:\s+["']([^"']*)["'])?\)/

export function MarkdownContent({ children, className = '' }: MarkdownContentProps) {
  const visibleContent = children.replace(/<!--[\s\S]*?-->/g, '').trim()

  if (className.includes('timeline-content')) {
    const [header, ...items] = visibleContent.split(/(?=^###\s)/m)

    return (
      <div className={`prose-content ${className}`.trim()}>
        {header && <ReactMarkdown remarkPlugins={[remarkGfm]}>{header}</ReactMarkdown>}
        {items.map((item, index) => {
          const match = item.match(IMAGE_REGEX)
          if (match) {
            const [, alt, src, title] = match
            const textContent = item.replace(IMAGE_REGEX, '').trim()

            return (
              <div key={index} className="timeline-item timeline-item-split">
                <div className="timeline-item-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{textContent}</ReactMarkdown>
                </div>
                <figure className="timeline-figure">
                  <img src={src} alt={alt ?? ''} loading="lazy" />
                  {title && <figcaption>{title}</figcaption>}
                </figure>
              </div>
            )
          }

          return (
            <div key={index} className="timeline-item">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{item}</ReactMarkdown>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={`prose-content ${className}`.trim()}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => {
            const items = Children.toArray(children)
            if (
              items.length === 1 &&
              isValidElement(items[0]) &&
              (items[0].type === 'img' || (items[0].props as Record<string, unknown>)?.src)
            ) {
              const img = items[0] as ReactElement<{
                src?: string
                alt?: string
                title?: string
              }>
              return (
                <figure className="timeline-figure">
                  <img src={img.props.src} alt={img.props.alt ?? ''} loading="lazy" />
                  {img.props.title && <figcaption>{img.props.title}</figcaption>}
                </figure>
              )
            }
            return <p>{children}</p>
          },
        }}
      >
        {visibleContent}
      </ReactMarkdown>
    </div>
  )
}
