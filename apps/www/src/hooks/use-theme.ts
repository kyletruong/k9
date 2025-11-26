import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme') as Theme | null
      if (stored) setTheme(stored)
    } catch {
      // localStorage may be unavailable (e.g., Safari private mode)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const applyTheme = (theme: Theme) => {
      if (theme === 'system') {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches
        root.classList.toggle('dark', prefersDark)
      } else {
        root.classList.toggle('dark', theme === 'dark')
      }
    }

    applyTheme(theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // localStorage may be unavailable
    }

    if (theme === 'system') {
      const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => applyTheme('system')
      mediaQueryList.addEventListener('change', handler)
      return () => mediaQueryList.removeEventListener('change', handler)
    }
  }, [theme])

  return {
    setTheme,
    theme,
  }
}
