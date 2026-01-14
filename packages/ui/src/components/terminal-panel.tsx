import { cn } from '../lib/utils'

export type TerminalPanelProps = React.ComponentProps<'div'> & {
  promptTitle?: React.ReactNode
  showCursor?: boolean
  headerActions?: React.ReactNode
  footerActions?: React.ReactNode
  footer?: React.ReactNode
}

export function TerminalPanel({
  className,
  promptTitle,
  showCursor = false,
  headerActions,
  footerActions,
  footer,
  children,
  ...props
}: TerminalPanelProps) {
  return (
    <div
      className={cn('relative border-2 border-foreground', className)}
      data-slot='terminal-panel'
      {...props}
    >
      {promptTitle && (
        <span className='top-0 left-4 px-2 tracking-wide sm:max-w-none absolute inline-flex max-w-[calc(100%-6rem)] -translate-y-1/2 items-center bg-background'>
          <span className='truncate'>{promptTitle}</span>
          {showCursor && (
            <span
              aria-hidden='true'
              className='ml-0.5 inline-block h-[1em] w-[0.6em] shrink-0 animate-blink bg-primary'
            />
          )}
        </span>
      )}
      {headerActions && (
        <span className='top-0 right-4 px-1 absolute -translate-y-1/2 bg-background'>
          {headerActions}
        </span>
      )}
      <div className='py-6 px-[2ch]'>{children}</div>
      {footer && (
        <span className='bottom-0 px-2 absolute left-1/2 -translate-x-1/2 translate-y-1/2 bg-background'>
          {footer}
        </span>
      )}
      {footerActions && (
        <span className='bottom-0 right-4 px-1 absolute translate-y-1/2 bg-background'>
          {footerActions}
        </span>
      )}
    </div>
  )
}
