import type * as React from 'react'

import { cn } from '../lib/utils'

function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    // oxlint-disable-next-line jsx-a11y/label-has-associated-control -- Label component is used with external form inputs
    <label
      className={cn(
        'gap-2 text-xs flex items-center leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      data-slot='label'
      {...props}
    />
  )
}

export { Label }
