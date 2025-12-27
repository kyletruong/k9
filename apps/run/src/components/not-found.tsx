import { buttonVariants } from '@repo/ui/components/button'
import { cn } from '@repo/ui/lib/utils'
import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <div className='flex flex-col min-h-screen items-center pt-[38vh]'>
      <h1 className='mb-6 text-8xl font-semibold'>404</h1>
      <Link className={cn(buttonVariants({ size: 'lg' }), 'text-xl')} to='/'>
        Take me home
      </Link>
    </div>
  )
}
