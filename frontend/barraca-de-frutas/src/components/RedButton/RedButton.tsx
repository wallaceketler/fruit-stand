import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface RedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  href?: string
  link?: boolean
}

export function RedButton({
  children,
  className,
  href,
  id,
  link = false,
  ...buttonProps
}: RedButtonProps) {
  if (link && href) {
    return (
      <Link
        className={cn(buttonVariants({ size: 'lg' }), 'w-full', className)}
        href={href}
        id={id}
      >
        {children}
      </Link>
    )
  }

  return (
    <Button className={cn('w-full', className)} id={id} size="lg" {...buttonProps}>
      {children}
    </Button>
  )
}
