import { Button } from '@repo/ui/components/button'
import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <div className='flex flex-col min-h-screen items-center pt-[38vh]'>
      <h1 className='mb-6 text-8xl font-semibold'>404</h1>
      <Button asChild className='text-base' size='lg'>
        <Link to='/'>Take me home</Link>
      </Button>
    </div>
  )
}
