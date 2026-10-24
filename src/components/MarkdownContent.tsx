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
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{visibleContent}</ReactMarkdown>
    </div>
  )
}
