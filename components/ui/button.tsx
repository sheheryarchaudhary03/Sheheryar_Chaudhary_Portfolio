import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-[-0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_1px_0_0_rgb(255_255_255/0.12)_inset,0_10px_30px_-12px_rgb(0_0_0/0.45)] hover:bg-primary/90",
        brand:
          "bg-brand text-brand-foreground shadow-[0_10px_30px_-12px_rgb(241_105_45/0.7)] hover:brightness-105",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:bg-accent hover:border-foreground/25",
        glass:
          "glass border border-border text-foreground hover:bg-glass-strong",
        ghost: "text-foreground hover:bg-accent",
        link: "rounded-none px-0 text-foreground underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        default: "h-11 px-6",
        lg: "h-14 px-8 text-[15px]",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
