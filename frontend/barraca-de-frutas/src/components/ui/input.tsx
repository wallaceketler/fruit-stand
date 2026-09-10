import * as React from "react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-12 w-full min-w-0 rounded-xl border-2 border-input bg-[#fffdf8] px-4 py-2 text-base font-semibold shadow-[2px_2px_0_var(--foreground)] transition-[box-shadow,transform] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-bold file:text-foreground placeholder:font-medium placeholder:text-muted-foreground focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-secondary disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/25',
        className
      )}
      {...props}
    />
  )
}

export { Input }
