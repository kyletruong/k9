import { Monitor, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useTheme } from '../hooks/use-theme'
import { cn } from '../lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'

/* oxlint-disable sort-keys -- intentional display order */
const THEMES = [
  { key: 'system', label: 'System', shortLabel: 'SYS', icon: Monitor },
  { key: 'light', label: 'Light', shortLabel: 'LT', icon: Sun },
  { key: 'dark', label: 'Dark', shortLabel: 'DK', icon: Moon },
] as const
/* oxlint-enable sort-keys */

const MENU_ITEM_CLASS =
  'cursor-pointer gap-3 px-3 uppercase tracking-wide data-[highlighted]:!bg-transparent data-[highlighted]:!text-primary data-[highlighted]:**:!text-primary'

export type ThemeSwitcherProps = {
  className?: string
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentTheme = THEMES.find((t) => t.key === theme) ?? THEMES[0]

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
        {currentTheme.shortLabel}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='min-w-28 border-2 border-foreground bg-background p-0 shadow-none ring-0'
        sideOffset={8}
      >
        {THEMES.map(({ key, label, icon: Icon }) => (
          <DropdownMenuItem
            className={cn(
              MENU_ITEM_CLASS,
              theme === key ? 'text-foreground' : 'text-muted-foreground',
            )}
            key={key}
            onClick={() => setTheme(key)}
          >
            <Icon />
            {label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className='mx-0 bg-foreground' />
        <DropdownMenuItem
          className={cn(MENU_ITEM_CLASS, 'text-muted-foreground')}
          onClick={() => setOpen(false)}
        >
          <X />
          Close
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
