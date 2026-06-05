"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../cn";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

type DialogContentProps = React.ComponentPropsWithRef<
  typeof DialogPrimitive.Content
>;

export function DialogContent({
  className,
  children,
  ref,
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

type DialogTitleProps = React.ComponentPropsWithRef<
  typeof DialogPrimitive.Title
>;

export function DialogTitle({ className, ref, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("text-brand-900 text-lg font-semibold", className)}
      {...props}
    />
  );
}

type DialogDescriptionProps = React.ComponentPropsWithRef<
  typeof DialogPrimitive.Description
>;

export function DialogDescription({
  className,
  ref,
  ...props
}: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-brand-600 mt-1 text-sm", className)}
      {...props}
    />
  );
}
