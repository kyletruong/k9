import type * as React from 'react'

import { cn } from '../lib/utils'

function Card({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
  return (
    <div
      className={cn(
        'gap-4 py-4 text-xs/relaxed has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-2 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 group/card flex flex-col overflow-hidden rounded-none bg-card text-card-foreground ring-1 ring-foreground/10 *:[img:first-child]:rounded-none *:[img:last-child]:rounded-none',
        className,
      )}
      data-size={size}
      data-slot='card'
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'gap-1 px-4 group-data-[size=sm]/card:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3 group/card-header @container/card-header grid auto-rows-min items-start rounded-none has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]',
        className,
      )}
      data-slot='card-header'
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('text-sm font-medium group-data-[size=sm]/card:text-sm', className)}
      data-slot='card-title'
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('text-xs/relaxed text-muted-foreground', className)}
      data-slot='card-description'
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      data-slot='card-action'
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('px-4 group-data-[size=sm]/card:px-3', className)}
      data-slot='card-content'
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'p-4 group-data-[size=sm]/card:p-3 flex items-center rounded-none border-t',
        className,
      )}
      data-slot='card-footer'
      {...props}
    />
  )
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
