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
          'px-2 py-0.5 text-xs tracking-wide cursor-pointer bg-background uppercase transition-colors',
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
        className='min-w-0 p-0 w-fit border-2 border-foreground bg-background shadow-none ring-0'
        sideOffset={8}
      >
        {THEMES.map(({ key, label, icon: Icon }) => (
          <DropdownMenuItem
            className='gap-3 px-3 tracking-wide cursor-pointer text-muted-foreground uppercase focus:bg-transparent focus:text-primary data-[state=selected]:text-foreground'
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
