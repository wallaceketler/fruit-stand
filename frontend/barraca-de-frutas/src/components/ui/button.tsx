import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border-2 border-foreground bg-clip-padding text-sm font-black whitespace-nowrap shadow-[3px_3px_0_var(--foreground)] transition-[transform,box-shadow,background-color] outline-none select-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--foreground)] focus-visible:ring-3 focus-visible:ring-secondary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/30 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-[#f46b55]',
        outline: 'bg-card text-foreground hover:bg-muted aria-expanded:bg-muted',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-[#ffd35c] aria-expanded:bg-secondary',
        ghost: 'border-transparent bg-transparent text-foreground shadow-none hover:translate-x-0 hover:translate-y-0 hover:border-foreground hover:bg-muted hover:shadow-none aria-expanded:bg-muted',
        destructive: 'bg-destructive text-white hover:bg-[#e4534c] focus-visible:ring-destructive/30',
        link: 'border-transparent bg-transparent text-primary shadow-none underline-offset-4 hover:translate-x-0 hover:translate-y-0 hover:shadow-none hover:underline',
      },
      size: {
        default: 'h-10 gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        xs: 'h-7 gap-1 rounded-lg px-2 text-xs shadow-[2px_2px_0_var(--foreground)] [&_svg:not([class*=size-])]:size-3',
        sm: 'h-9 gap-1.5 rounded-lg px-3 text-xs shadow-[2px_2px_0_var(--foreground)] [&_svg:not([class*=size-])]:size-3.5',
        lg: 'h-12 gap-2 px-5 text-base has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4',
        icon: 'size-10',
        "icon-xs": 'size-7 rounded-lg shadow-[2px_2px_0_var(--foreground)] [&_svg:not([class*=size-])]:size-3',
        "icon-sm": 'size-9 rounded-lg shadow-[2px_2px_0_var(--foreground)]',
        "icon-lg": 'size-12',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
