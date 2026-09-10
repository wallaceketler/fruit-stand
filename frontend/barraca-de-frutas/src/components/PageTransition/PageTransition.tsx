import { ViewTransition, type ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <ViewTransition default="none" enter="page-enter" exit="page-exit">
      {children}
    </ViewTransition>
  )
}
