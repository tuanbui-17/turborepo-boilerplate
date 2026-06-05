import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render the child element instead of a <button> (Radix Slot). */
  asChild?: boolean;
  variant?: "primary" | "secondary";
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({
  className,
  variant = "primary",
  asChild = false,
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(
        "focus-visible:ring-brand-500 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
        variant === "primary" && "bg-brand-600 hover:bg-brand-700 text-white",
        variant === "secondary" &&
          "bg-brand-50 text-brand-700 hover:bg-brand-100",
        className,
      )}
      {...props}
    />
  );
}
