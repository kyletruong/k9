import { cn } from '@repo/ui/lib/utils'

type TerminalCardProps = React.ComponentProps<'article'> & {
  title?: string
  showCursor?: boolean
  headerRight?: React.ReactNode
  footer?: React.ReactNode
}

function TerminalCard({
  className,
  title,
  showCursor = false,
  headerRight,
  footer,
  children,
  ...props
}: TerminalCardProps) {
  return (
    <article
      className={cn('relative border-2 border-foreground', className)}
      data-slot='terminal-card'
      {...props}
    >
      {(title || headerRight) && (
        <div className='pointer-events-none absolute top-0 right-0 left-0 flex -translate-y-1/2 items-center justify-center px-4'>
          {title && (
            <span className='bg-background px-2 uppercase tracking-wide'>
              {title}
              {showCursor && <span className='animate-blink text-primary'>█</span>}
            </span>
          )}
          {headerRight && (
            <span className='pointer-events-auto absolute right-4 bg-background'>
              {headerRight}
            </span>
          )}
        </div>
      )}
      <section className='px-[2ch] py-6'>{children}</section>
      {footer && (
        <span className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-background px-2'>
          {footer}
        </span>
      )}
    </article>
  )
}

export { TerminalCard }
