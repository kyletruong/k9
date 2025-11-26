import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'

export function NotFound() {
  return (
    <div className='flex flex-col min-h-screen items-center justify-center'>
      <h1 className='mb-6 text-8xl font-semibold'>404</h1>
      <Button className='text-base' size='lg'>
        <Link to='/'>Back to home page</Link>
      </Button>
    </div>
  )
}
