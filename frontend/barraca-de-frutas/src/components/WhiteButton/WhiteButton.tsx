import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface WhiteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function WhiteButton({
  children,
  className,
  ...buttonProps
}: WhiteButtonProps) {
  return (
    <Button
      className={cn('w-full', className)}
      size="lg"
      variant="outline"
      {...buttonProps}
    >
      {children}
    </Button>
  )
}
