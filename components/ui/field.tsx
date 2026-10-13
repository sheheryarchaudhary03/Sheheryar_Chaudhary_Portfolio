import * as React from "react";

import { cn } from "@/lib/utils";

const fieldBase =
  "w-full min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-[15px] text-white placeholder:text-white/40 transition-[border-color,background-color,box-shadow] duration-300 outline-none hover:border-white/20 focus-visible:border-brand/70 focus-visible:bg-white/[0.06] focus-visible:ring-4 focus-visible:ring-brand/15 focus-visible:outline-none aria-invalid:border-destructive/80 disabled:cursor-not-allowed disabled:opacity-50";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(fieldBase, "h-13", className)}
      {...props}
    />
  );
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
      className={cn("text-[13px] font-medium tracking-[-0.005em] text-white/70", className)}
      {...props}
    />
  );
}

export { Input, Textarea, Label };
