import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className='min-h-screen'>
      <div className='flex flex-col items-center pt-[38vh]'>
        <p className='text-7xl font-bold'>[WIP]</p>
      </div>
    </div>
  )
}
