import { TerminalPanel } from '@repo/ui/components/terminal-panel'
import { ThemeSwitcher } from '@repo/ui/components/theme-switcher'
import { createFileRoute } from '@tanstack/react-router'

import { getLsMetadata } from '../../lib/ls'
import { PromptTitle } from '../../lib/prompt-title'

const Route = createFileRoute('/blog/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <TerminalPanel
      className='w-full'
      headerActions={<ThemeSwitcher />}
      showCursor
      promptTitle={<PromptTitle command='ls -lt' mobileCommand='ls' path='/blog' />}
    >
      <div className='whitespace-pre'>
        <span className='hidden text-muted-foreground sm:inline'>
          {getLsMetadata(new Date('2026-01-08T00:47:00Z'))}
        </span>
        <span>wip.md</span>
      </div>
    </TerminalPanel>
  )
}

export { Route }
