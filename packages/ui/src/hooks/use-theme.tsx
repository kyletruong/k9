import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  hydrated: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const injectTransitionStyles = (toTheme: Theme): HTMLStyleElement => {
  const styleId = `theme-transition-${Date.now()}`
  const style = document.createElement('style')
  style.id = styleId

  const isGoingDark =
    toTheme === 'dark' ||
    (toTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  style.textContent = `
    @supports (view-transition-name: root) {
      ::view-transition-old(root) {
        animation: none;
      }
      @media (prefers-reduced-motion: no-preference) {
        ::view-transition-new(root) {
          animation: ${isGoingDark ? 'wipe-in-dark' : 'wipe-in-light'} 0.2s ease-out;
        }
        @keyframes wipe-in-dark {
          from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
          to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
        }
        @keyframes wipe-in-light {
          from { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); }
          to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
        }
      }
    }
  `
  document.head.appendChild(style)

  return style
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setThemeState(stored)
      }
    } catch {
      // localStorage may be unavailable (e.g., Safari private mode)
    }
    setHydrated(true)
  }, [])

  // Skip applying theme until hydrated - inline FOUC script handles initial render
  useEffect(() => {
    if (!hydrated) {
      return
    }

    const root = document.documentElement
    const applyTheme = (t: Theme) => {
      const isDark =
        t === 'dark' ||
        (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      root.classList.toggle('dark', isDark)
      root.style.colorScheme = isDark ? 'dark' : 'light'
    }

    applyTheme(theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // localStorage may be unavailable
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        const newTheme = e.newValue
        if (newTheme === 'light' || newTheme === 'dark' || newTheme === 'system') {
          setThemeState(newTheme)
        }
      }
    }
    window.addEventListener('storage', handleStorage)

    let removeMediaListener: (() => void) | undefined
    if (theme === 'system') {
      const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => {
        applyTheme('system')
      }
      mediaQueryList.addEventListener('change', handler)
      removeMediaListener = () => {
        mediaQueryList.removeEventListener('change', handler)
      }
    }

    return () => {
      window.removeEventListener('storage', handleStorage)
      removeMediaListener?.()
    }
  }, [theme, hydrated])

  const value = useMemo(() => {
    const setTheme = (newTheme: Theme) => {
      if ('startViewTransition' in document) {
        const style = injectTransitionStyles(newTheme)
        const transition = document.startViewTransition(() => {
          setThemeState(newTheme)
        })
        void transition.finished.finally(() => {
          style.remove()
        })
      } else {
        setThemeState(newTheme)
      }
    }

    return { hydrated, setTheme, theme }
  }, [hydrated, theme])

  return <ThemeContext value={value}>{children}</ThemeContext>
}

const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { ThemeProvider, useTheme }
