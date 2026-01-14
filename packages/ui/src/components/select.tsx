import { Select as SelectPrimitive } from '@base-ui/react/select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import type * as React from 'react'

import { cn } from '../lib/utils'

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      className={cn('scroll-my-1', className)}
      data-slot='select-group'
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      className={cn('flex flex-1 text-left', className)}
      data-slot='select-value'
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: 'sm' | 'default'
}) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'gap-1.5 py-2 pr-2 pl-2.5 text-xs data-[size=default]:h-8 data-[size=sm]:h-7 *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*="size-"])]:size-4 flex w-fit items-center justify-between rounded-none border border-input bg-transparent whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=sm]:rounded-none *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className,
      )}
      data-size={size}
      data-slot='select-trigger'
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={<ChevronDownIcon className='size-4 pointer-events-none text-muted-foreground' />}
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        align={align}
        alignItemWithTrigger={alignItemWithTrigger}
        alignOffset={alignOffset}
        className='isolate z-50'
        side={side}
        sideOffset={sideOffset}
      >
        <SelectPrimitive.Popup
          className={cn(
            'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 min-w-36 shadow-md relative isolate z-50 max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-none bg-popover text-popover-foreground ring-1 ring-foreground/10 duration-100',
            className,
          )}
          data-slot='select-content'
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      className={cn('px-2 py-2 text-xs text-muted-foreground', className)}
      data-slot='select-label'
      {...props}
    />
  )
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'gap-2 py-2 pr-8 pl-2 text-xs [&_svg:not([class*="size-"])]:size-4 *:[span]:last:gap-2 relative flex w-full cursor-default items-center rounded-none outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center',
        className,
      )}
      data-slot='select-item'
      {...props}
    >
      <SelectPrimitive.ItemText className='gap-2 flex flex-1 shrink-0 whitespace-nowrap'>
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className='right-2 size-4 pointer-events-none absolute flex items-center justify-center' />
        }
      >
        <CheckIcon className='pointer-events-none' />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      className={cn('-mx-1 pointer-events-none h-px bg-border', className)}
      data-slot='select-separator'
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      className={cn(
        'py-1 [&_svg:not([class*="size-"])]:size-4 top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover',
        className,
      )}
      data-slot='select-scroll-up-button'
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      className={cn(
        'py-1 [&_svg:not([class*="size-"])]:size-4 bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover',
        className,
      )}
      data-slot='select-scroll-down-button'
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
