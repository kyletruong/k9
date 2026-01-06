import { buttonVariants } from '@repo/ui/components/button'
import { TerminalPanel } from '@repo/ui/components/terminal-panel'
import { ThemeSwitcher } from '@repo/ui/components/theme-switcher'
import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <TerminalPanel
      headerActions={<ThemeSwitcher />}
      title='404'
      className='mx-auto max-w-lg'
      showCursor
    >
      <div className='flex flex-col gap-6 text-center'>
        <p className='text-muted-foreground'>No such file or directory.</p>
        <Link className={buttonVariants({ className: 'self-center' })} to='/'>
          RETURN_TO_ORIGIN()
        </Link>
      </div>
    </TerminalPanel>
  )
}
