import { cn } from '../lib/utils'

export type TerminalPanelProps = React.ComponentProps<'div'> & {
  title?: string
  showCursor?: boolean
  headerActions?: React.ReactNode
  footerActions?: React.ReactNode
  footer?: React.ReactNode
}

export function TerminalPanel({
  className,
  title,
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
      {(title || headerActions) && (
        <div className='pointer-events-none absolute top-0 right-0 left-0 flex -translate-y-1/2 items-center justify-center px-4'>
          {title && (
            <span className='inline-flex items-center bg-background px-2 uppercase tracking-wide'>
              {title}
              {showCursor && (
                <span
                  aria-hidden='true'
                  className='ml-0.5 inline-block h-[1em] w-[0.6em] animate-blink bg-primary'
                />
              )}
            </span>
          )}
          {headerActions && (
            <span className='pointer-events-auto absolute right-4 bg-background px-1'>
              {headerActions}
            </span>
          )}
        </div>
      )}
      <div className='px-[2ch] py-6'>{children}</div>
      {(footer || footerActions) && (
        <div className='pointer-events-none absolute bottom-0 right-0 left-0 flex translate-y-1/2 items-center justify-center px-4'>
          {footer && <span className='bg-background px-2'>{footer}</span>}
          {footerActions && (
            <span className='pointer-events-auto absolute right-4 bg-background px-1'>
              {footerActions}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
