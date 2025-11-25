import { Link } from '@tanstack/react-router'
import {
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Globe,
  Home,
  Menu,
  Network,
  SquareFunction,
  StickyNote,
  X,
} from 'lucide-react'
import { useState } from 'react'
import WorkOSHeader from './workos-user.tsx'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [groupedExpanded, setGroupedExpanded] = useState<
    Record<string, boolean>
  >({})

  return (
    <>
      <header className='p-4 flex items-center bg-gray-800 text-white shadow-lg'>
        <button
          aria-label='Open menu'
          className='p-2 hover:bg-gray-700 rounded-lg transition-colors'
          onClick={() => setIsOpen(true)}
          type='button'
        >
          <Menu size={24} />
        </button>
        <h1 className='ml-4 text-xl font-semibold'>
          <Link to='/'>
            <img
              alt='TanStack Logo'
              className='h-10'
              src='/tanstack-word-logo-white.svg'
            />
          </Link>
        </h1>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between p-4 border-b border-gray-700'>
          <h2 className='text-xl font-bold'>Navigation</h2>
          <button
            aria-label='Close menu'
            className='p-2 hover:bg-gray-800 rounded-lg transition-colors'
            onClick={() => setIsOpen(false)}
            type='button'
          >
            <X size={24} />
          </button>
        </div>

        <nav className='flex-1 p-4 overflow-y-auto'>
          <Link
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2'
            onClick={() => setIsOpen(false)}
            to='/'
          >
            <Home size={20} />
            <span className='font-medium'>Home</span>
          </Link>

          {/* Demo Links Start */}

          <Link
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2'
            onClick={() => setIsOpen(false)}
            to='/demo/start/server-funcs'
          >
            <SquareFunction size={20} />
            <span className='font-medium'>Start - Server Functions</span>
          </Link>

          <Link
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2'
            onClick={() => setIsOpen(false)}
            to='/demo/start/api-request'
          >
            <Network size={20} />
            <span className='font-medium'>Start - API Request</span>
          </Link>

          <div className='flex flex-row justify-between'>
            <Link
              activeProps={{
                className:
                  'flex-1 flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
              }}
              className='flex-1 flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2'
              onClick={() => setIsOpen(false)}
              to='/demo/start/ssr'
            >
              <StickyNote size={20} />
              <span className='font-medium'>Start - SSR Demos</span>
            </Link>
            <button
              className='p-2 hover:bg-gray-800 rounded-lg transition-colors'
              onClick={() =>
                setGroupedExpanded((prev) => ({
                  ...prev,
                  StartSSRDemo: !prev.StartSSRDemo,
                }))
              }
              type='button'
            >
              {groupedExpanded.StartSSRDemo ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
            </button>
          </div>
          {groupedExpanded.StartSSRDemo && (
            <div className='flex flex-col ml-4'>
              <Link
                activeProps={{
                  className:
                    'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                }}
                className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2'
                onClick={() => setIsOpen(false)}
                to='/demo/start/ssr/spa-mode'
              >
                <StickyNote size={20} />
                <span className='font-medium'>SPA Mode</span>
              </Link>

              <Link
                activeProps={{
                  className:
                    'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                }}
                className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2'
                onClick={() => setIsOpen(false)}
                to='/demo/start/ssr/full-ssr'
              >
                <StickyNote size={20} />
                <span className='font-medium'>Full SSR</span>
              </Link>

              <Link
                activeProps={{
                  className:
                    'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                }}
                className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2'
                onClick={() => setIsOpen(false)}
                to='/demo/start/ssr/data-only'
              >
                <StickyNote size={20} />
                <span className='font-medium'>Data Only</span>
              </Link>
            </div>
          )}

          <Link
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2'
            onClick={() => setIsOpen(false)}
            to='/demo/workos'
          >
            <CircleUserRound size={20} />
            <span className='font-medium'>WorkOS</span>
          </Link>

          <Link
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2'
            onClick={() => setIsOpen(false)}
            to='/demo/convex'
          >
            <Globe size={20} />
            <span className='font-medium'>Convex</span>
          </Link>

          <Link
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2'
            onClick={() => setIsOpen(false)}
            to='/demo/sentry/testing'
          >
            <Globe size={20} />
            <span className='font-medium'>Sentry</span>
          </Link>

          <Link
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2'
            onClick={() => setIsOpen(false)}
            to='/demo/tanstack-query'
          >
            <Network size={20} />
            <span className='font-medium'>TanStack Query</span>
          </Link>

          {/* Demo Links End */}
        </nav>

        <div className='p-4 border-t border-gray-700 bg-gray-800 flex flex-col gap-2'>
          <WorkOSHeader />
        </div>
      </aside>
    </>
  )
}
