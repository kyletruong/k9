import { renderToString } from 'katex'
import { useMemo } from 'react'

interface MathProps {
  children: string
  className?: string
  display?: boolean
}

export function Math({ children, className, display = false }: MathProps) {
  const html = useMemo(
    () => renderToString(children, { displayMode: display, throwOnError: false }),
    [children, display],
  )

  const Tag = display ? 'div' : 'span'
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
