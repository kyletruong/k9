import { useTheme } from '../hooks/use-theme'
import { cn } from '../lib/utils'

/* oxlint-disable sort-keys -- intentional display order */
const THEMES = [
  { key: 'system', label: 'System', shortLabel: 'OS' },
  { key: 'light', label: 'Light', shortLabel: 'LT' },
  { key: 'dark', label: 'Dark', shortLabel: 'DK' },
] as const
/* oxlint-enable sort-keys */

export type ThemeSwitcherProps = {
  className?: string
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, setTheme, hydrated } = useTheme()
  const currentIndex = Math.max(
    0,
    THEMES.findIndex((t) => t.key === theme),
  )
  const current = THEMES[currentIndex] ?? THEMES[0]

  if (!hydrated) {
    return null
  }

  return (
    <button
      aria-label={`Theme: ${current.label}. Click to switch.`}
      className={cn(
        'px-2 py-0.5 text-xs tracking-wide cursor-pointer bg-background uppercase transition-colors',
        'text-muted-foreground hover:text-primary',
        className,
      )}
      data-slot='theme-switcher'
      onClick={() => {
        const next = THEMES[(currentIndex + 1) % THEMES.length]
        if (next) setTheme(next.key)
      }}
      type='button'
    >
      {current.shortLabel}
    </button>
  )
}
