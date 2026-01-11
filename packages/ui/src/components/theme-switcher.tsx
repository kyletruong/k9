import { Monitor, Moon, Sun } from 'lucide-react'
import { useState } from 'react'

import { useTheme } from '../hooks/use-theme'
import { cn } from '../lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'

/* oxlint-disable sort-keys -- intentional display order */
const THEMES = [
  { key: 'system', label: 'System', shortLabel: 'SYS', icon: Monitor },
  { key: 'light', label: 'Light', shortLabel: 'LT', icon: Sun },
  { key: 'dark', label: 'Dark', shortLabel: 'DK', icon: Moon },
] as const
/* oxlint-enable sort-keys */

export type ThemeSwitcherProps = {
  className?: string
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, setTheme, hydrated } = useTheme()
  const [open, setOpen] = useState(false)
  const { shortLabel } = THEMES.find((t) => t.key === theme) ?? THEMES[0]

  if (!hydrated) {
    return null
  }

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger
        className={cn(
          'cursor-pointer bg-background px-2 py-0.5 text-xs uppercase tracking-wide transition-colors',
          'text-muted-foreground hover:text-primary',
          'data-[popup-open]:bg-foreground data-[popup-open]:text-background',
          className,
        )}
        data-slot='theme-switcher'
      >
        {shortLabel}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-fit min-w-0 border-2 border-foreground bg-background p-0 shadow-none ring-0'
        sideOffset={8}
      >
        {THEMES.map(({ key, label, icon: Icon }) => (
          <DropdownMenuItem
            className='cursor-pointer gap-3 px-3 uppercase tracking-wide text-muted-foreground focus:bg-transparent focus:text-primary data-[state=selected]:text-foreground'
            data-state={theme === key ? 'selected' : undefined}
            key={key}
            onClick={() => {
              setTheme(key)
            }}
          >
            <Icon />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
