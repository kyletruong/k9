import { Monitor, Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { type Theme, useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'

const THEMES = [
  {
    icon: Monitor,
    key: 'system',
    label: 'System theme',
  },
  {
    icon: Sun,
    key: 'light',
    label: 'Light theme',
  },
  {
    icon: Moon,
    key: 'dark',
    label: 'Dark theme',
  },
] as const

export type ThemeSwitcherProps = {
  className?: string
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn(
        'relative isolate flex h-8 rounded-full bg-background p-1 ring-1 ring-border',
        className,
      )}
    >
      {THEMES.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key

        return (
          <button
            aria-label={label}
            className='relative h-6 w-6 cursor-pointer rounded-full'
            key={key}
            onClick={() => setTheme(key as Theme)}
            type='button'
          >
            {isActive && (
              <motion.div
                className='absolute inset-0 rounded-full bg-secondary'
                layoutId='activeTheme'
                transition={{ duration: 0.5, type: 'spring' }}
              />
            )}
            <Icon
              className={cn(
                'relative z-10 m-auto h-4 w-4',
                isActive ? 'text-foreground' : 'text-muted-foreground',
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
