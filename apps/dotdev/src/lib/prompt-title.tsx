import { Link } from '@tanstack/react-router'

type PromptTitleProps = {
  command: string
  mobileCommand?: string
  path?: string
}

export function PromptTitle({ command, mobileCommand, path = '~' }: PromptTitleProps) {
  return (
    <>
      <span className='hidden sm:inline'>kyle@k9:</span>
      <Link to='/' className='text-primary underline hover:cursor-pointer'>
        ~
      </Link>
      {path !== '~' && path}$&nbsp;
      {mobileCommand ? (
        <>
          <span className='sm:hidden'>{mobileCommand}</span>
          <span className='hidden sm:inline'>{command}</span>
        </>
      ) : (
        command
      )}
    </>
  )
}
