import { Link } from '@tanstack/react-router'

type PromptTitleProps = {
  command: string
  mobileCommand?: string
  path?: string
  allPathsClickable?: boolean
}

function normalizePath(rawPath?: string): string {
  if (!rawPath || rawPath === '~') {
    return '/'
  }

  let path = rawPath
  if (!path.startsWith('/')) {
    path = '/' + path
  }
  if (path !== '/' && path.endsWith('/')) {
    path = path.replace(/\/+$/, '')
  }

  return path
}

export function PromptTitle({ command, mobileCommand, path, allPathsClickable }: PromptTitleProps) {
  const normalizedPath = normalizePath(path)
  const isHome = normalizedPath === '/'
  const segments = normalizedPath.split('/').filter(Boolean)
  const homeIsClickable = !isHome || allPathsClickable

  const renderPath = (
    <>
      <span className='sm:inline hidden'>kyle@k9:</span>
      {homeIsClickable ? <Link to='/'>~</Link> : <span>~</span>}
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1
        const segmentPath = '/' + segments.slice(0, index + 1).join('/')
        const isClickable = allPathsClickable ?? !isLast

        return (
          <span key={segmentPath}>
            /{isClickable ? <Link to={segmentPath}>{segment}</Link> : <span>{segment}</span>}
          </span>
        )
      })}
      $
    </>
  )

  const renderCommand = mobileCommand ? (
    <>
      <span className='sm:hidden'>{mobileCommand}</span>
      <span className='sm:inline hidden'>{command}</span>
    </>
  ) : (
    command
  )

  return (
    <>
      {renderPath} {renderCommand}
    </>
  )
}
