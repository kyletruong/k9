import { buttonVariants } from '@repo/ui/components/button'
import { TerminalPanel } from '@repo/ui/components/terminal-panel'
import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <TerminalPanel title='404 // NOT_FOUND' className='w-full max-w-md' showCursor>
        <div className='flex flex-col gap-6 text-center'>
          <p className='text-muted-foreground'>No such file or directory.</p>
          <Link className={buttonVariants()} to='/'>
            RETURN_TO_ORIGIN()
          </Link>
        </div>
      </TerminalPanel>
    </div>
  )
}
