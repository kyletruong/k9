import { TerminalPanel } from '@repo/ui/components/terminal-panel'
import { ThemeSwitcher } from '@repo/ui/components/theme-switcher'
import { useLocation } from '@tanstack/react-router'

import { PromptTitle } from '../lib/prompt-title'

export function NotFound() {
  const location = useLocation()
  const path = location.pathname.slice(1)

  return (
    <TerminalPanel
      className='w-full'
      headerActions={<ThemeSwitcher />}
      promptTitle={<PromptTitle allPathsClickable command={`cd ${path}`} />}
      showCursor
    >
      <p className='text-destructive text-sm sm:text-base'>cd: {path}: No such file or directory</p>
    </TerminalPanel>
  )
}
