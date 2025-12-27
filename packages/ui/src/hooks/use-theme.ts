import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

const injectTransitionStyles = (toTheme: Theme) => {
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
  `
  document.head.appendChild(style)

  // Clean up after animation
  setTimeout(() => {
    document.getElementById(styleId)?.remove()
  }, 1000)
}

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>('system')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setThemeState(stored)
      }
    } catch {
      // localStorage may be unavailable (e.g., Safari private mode)
    }
  }, [])

  useEffect(() => {
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
      const handler = () => applyTheme('system')
      mediaQueryList.addEventListener('change', handler)
      return () => mediaQueryList.removeEventListener('change', handler)
    }
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    // Use View Transitions API if available
    if ('startViewTransition' in document) {
      injectTransitionStyles(newTheme)
      ;(document as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        setThemeState(newTheme)
      })
    } else {
      setThemeState(newTheme)
    }
  }

  return {
    setTheme,
    theme,
  }
}
