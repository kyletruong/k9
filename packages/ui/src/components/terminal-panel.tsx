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
        <span className='absolute top-0 left-4 -translate-y-1/2 inline-flex items-center bg-background px-2 tracking-wide'>
          {promptTitle}
          {showCursor && (
            <span
              aria-hidden='true'
              className='ml-0.5 inline-block h-[1em] w-[0.6em] animate-blink bg-primary'
            />
          )}
        </span>
      )}
      {headerActions && (
        <span className='absolute top-0 right-4 -translate-y-1/2 bg-background px-1'>
          {headerActions}
        </span>
      )}
      <div className='px-[2ch] py-6'>{children}</div>
      {footer && (
        <span className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-background px-2'>
          {footer}
        </span>
      )}
      {footerActions && (
        <span className='absolute bottom-0 right-4 translate-y-1/2 bg-background px-1'>
          {footerActions}
        </span>
      )}
    </div>
  )
}
