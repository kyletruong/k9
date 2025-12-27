import type * as React from 'react'
import { cn } from '../lib/utils'

function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    // oxlint-disable-next-line jsx-a11y/label-has-associated-control -- Label component is used with external form inputs
    <label
      className={cn(
        'gap-2 text-xs leading-none group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed',
        className,
      )}
      data-slot='label'
      {...props}
    />
  )
}

export { Label }
