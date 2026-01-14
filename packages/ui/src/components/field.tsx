import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { useMemo } from 'react'

import { cn } from '../lib/utils'
import { Label } from './label'
import { Separator } from './separator'

function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return (
    <fieldset
      className={cn(
        'gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3 flex flex-col',
        className,
      )}
      data-slot='field-set'
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = 'legend',
  ...props
}: React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
  return (
    <legend
      className={cn(
        'mb-2.5 font-medium data-[variant=label]:text-xs data-[variant=legend]:text-sm',
        className,
      )}
      data-slot='field-legend'
      data-variant={variant}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'gap-5 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4 group/field-group @container/field-group flex w-full flex-col',
        className,
      )}
      data-slot='field-group'
      {...props}
    />
  )
}

const fieldVariants = cva('data-[invalid=true]:text-destructive gap-2 group/field flex w-full', {
  defaultVariants: {
    orientation: 'vertical',
  },
  variants: {
    orientation: {
      horizontal:
        'flex-row items-center [&>[data-slot=field-label]]:flex-auto has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      responsive:
        'flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto @md/field-group:[&>[data-slot=field-label]]:flex-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      vertical: 'flex-col [&>*]:w-full [&>.sr-only]:w-auto',
    },
  },
})

function Field({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      className={cn(fieldVariants({ orientation }), className)}
      data-orientation={orientation}
      data-slot='field'
      role='group'
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('gap-0.5 group/field-content leading-snug flex flex-1 flex-col', className)}
      data-slot='field-content'
      {...props}
    />
  )
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      className={cn(
        'gap-2 [&>*]:data-[slot=field]:p-2 group/field-label peer/field-label leading-snug flex w-fit group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-none has-[>[data-slot=field]]:border dark:has-data-checked:bg-primary/10',
        'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
        className,
      )}
      data-slot='field-label'
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'gap-2 text-xs/relaxed leading-snug flex w-fit items-center group-data-[disabled=true]/field:opacity-50',
        className,
      )}
      data-slot='field-label'
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'text-xs/relaxed [[data-variant=legend]+&]:-mt-1.5 leading-normal font-normal text-left text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance',
        'last:mt-0 nth-last-2:-mt-1',
        '[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
        className,
      )}
      data-slot='field-description'
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        '-my-2 h-5 text-xs group-data-[variant=outline]/field-group:-mb-2 relative',
        className,
      )}
      data-content={!!children}
      data-slot='field-separator'
      {...props}
    >
      <Separator className='inset-0 absolute top-1/2' />
      {children && (
        <span
          className='px-2 relative mx-auto block w-fit bg-background text-muted-foreground'
          data-slot='field-separator-content'
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  // oxlint-disable-next-line typescript-eslint/promise-function-async: false positive by oxlint because of nested JSX
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()]

    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className='ml-4 gap-1 flex list-disc flex-col'>
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={`error-${error.message}-${index}`}>{error.message}</li>,
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      className={cn('text-xs font-normal text-destructive', className)}
      data-slot='field-error'
      role='alert'
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
}
