// Base components with cn() built-in
import { cn } from "@/shared/utils/cn";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type PolymorphicComponentProps<E extends ElementType> = {
  as?: E;
  className?: string;
} & ComponentPropsWithoutRef<E>;

// Box component - replaces <div>
export function Box<E extends ElementType = "div">({
  as,
  className,
  ...props
}: PolymorphicComponentProps<E>) {
  const Component = as || "div";
  return <Component className={cn(className)} {...props} />;
}

// Button base - replaces <button>
export function ButtonBase<E extends ElementType = "button">({
  as,
  className,
  ...props
}: PolymorphicComponentProps<E>) {
  const Component = as || "button";
  return <Component className={cn(className)} {...props} />;
}

// Input base - replaces <input>
export function InputBase({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) {
  return <input className={cn(className)} {...props} />;
}

// Text - replaces <p>, <span>, <label>
export function Text<E extends ElementType = "p">({
  as,
  className,
  ...props
}: PolymorphicComponentProps<E>) {
  const Component = as || "p";
  return <Component className={cn(className)} {...props} />;
}
