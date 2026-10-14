import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full font-display text-sm font-semibold transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-rathna-blue/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-[1.5px] border-deep-navy bg-kolam-gold text-deep-navy shadow-[3px_3px_0_#14233f] hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-[#edb34f] hover:shadow-[1px_1px_0_#14233f] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        outline:
          "border-[1.5px] border-deep-navy bg-pearl-white text-deep-navy shadow-[3px_3px_0_#14233f] hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-sky-tint hover:shadow-[1px_1px_0_#14233f] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        secondary:
          "border border-rathna-blue/15 bg-sky-tint text-rathna-blue hover:bg-rathna-blue hover:text-pearl-white",
        ghost: "text-deep-navy hover:bg-sky-tint",
        link: "text-rathna-blue underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 gap-2 px-5 py-2",
        sm: "h-8 gap-1.5 px-3 text-xs",
        lg: "h-12 gap-2.5 px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = "Button"

export { Button, buttonVariants }
