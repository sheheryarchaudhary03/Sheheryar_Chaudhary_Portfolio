import * as React from "react";

import { cn } from "@/lib/utils";

const fieldBase =
  "w-full min-w-0 rounded-2xl border border-input bg-background/70 px-4 text-[15px] text-foreground shadow-[inset_0_2px_5px_rgb(20_32_18/0.06)] placeholder:text-muted-foreground/80 transition-[border-color,background-color,box-shadow] duration-300 outline-none hover:border-border-strong focus-visible:border-brand focus-visible:bg-background focus-visible:ring-4 focus-visible:ring-brand/15 focus-visible:outline-none aria-invalid:border-destructive/80 disabled:cursor-not-allowed disabled:opacity-50";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(fieldBase, "h-13", className)} {...props} />;
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldBase, "min-h-36 resize-y py-3.5 leading-relaxed", className)}
      {...props}
    />
  );
}

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn("text-[13px] font-medium tracking-[-0.005em] text-foreground/80", className)}
      {...props}
    />
  );
}

export { Input, Textarea, Label };
