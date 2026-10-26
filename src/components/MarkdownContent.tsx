import { Children, isValidElement, type ReactElement } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MarkdownContentProps = {
  children: string
  className?: string
}

export function MarkdownContent({ children, className = '' }: MarkdownContentProps) {
  const visibleContent = children.replace(/<!--[\s\S]*?-->/g, '').trim()

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
