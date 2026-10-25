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
          "bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.18),inset_0_-3px_8px_rgb(0_0_0/0.18),0_14px_30px_-14px_rgb(20_32_18/0.6)] hover:bg-primary/92 hover:-translate-y-0.5",
        brand:
          "bg-brand text-brand-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.2),inset_0_-3px_8px_rgb(0_0_0/0.15),0_14px_30px_-14px_rgb(20_32_18/0.55)] hover:brightness-105 hover:-translate-y-0.5",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:bg-accent hover:border-foreground/25",
        glass: "clay text-foreground hover:-translate-y-0.5",
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
