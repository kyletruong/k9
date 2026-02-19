import { Link } from '@tanstack/react-router'

import { buttonVariants } from '@repo/ui/components/button'
import { TerminalPanel } from '@repo/ui/components/terminal-panel'

export function NotFound() {
  return (
    <div className='p-4 flex min-h-screen items-center justify-center'>
      <TerminalPanel title='404 // NOT_FOUND' className='max-w-md w-full' showCursor>
        <div className='gap-6 flex flex-col text-center'>
          <p className='text-muted-foreground'>No such file or directory.</p>
          <Link className={buttonVariants()} to='/'>
            RETURN_TO_ORIGIN()
          </Link>
        </div>
      </TerminalPanel>
    </div>
  )
}
