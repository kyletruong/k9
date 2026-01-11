import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'

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
    const applyTheme = (theme: Theme) => {
      if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
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
      const handler = () => {
        applyTheme('system')
      }
      mediaQueryList.addEventListener('change', handler)
      return () => {
        mediaQueryList.removeEventListener('change', handler)
      }
    }
  }, [theme, hydrated])

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

  return <ThemeContext value={{ hydrated, setTheme, theme }}>{children}</ThemeContext>
}

const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { ThemeProvider, useTheme }
