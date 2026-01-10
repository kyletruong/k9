import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

type AnchorProps = {
  children?: ReactNode
  href?: string
}

export const mdxComponents = {
  a: ({ children, href }: AnchorProps) => {
    if (typeof href === 'string' && href.startsWith('/')) {
      return <Link to={href}>{children}</Link>
    }
    return (
      <a href={href} rel='noopener noreferrer' target='_blank'>
        {children}
      </a>
    )
  },
}
