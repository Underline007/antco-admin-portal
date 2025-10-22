// Styled components pattern with cn() pre-applied
import { cn } from "@/shared/utils/cn";
import type { ComponentPropsWithoutRef } from "react";

// Card components
export const Card = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => (
  <div className={cn("bg-white rounded-lg shadow", className)} {...props} />
);

export const CardHeader = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => (
  <div className={cn("p-6 pb-3", className)} {...props} />
);

export const CardBody = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => (
  <div className={cn("p-6", className)} {...props} />
);

export const CardFooter = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => (
  <div className={cn("p-6 pt-3", className)} {...props} />
);

// Form components
export const FormGroup = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => (
  <div className={cn("space-y-2", className)} {...props} />
);

export const Label = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"label">) => (
  <label
    className={cn("block text-sm font-medium text-gray-700", className)}
    {...props}
  />
);

export const Input = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) => (
  <input
    className={cn(
      "w-full px-4 py-2 border border-gray-300 rounded-lg",
      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "transition-colors",
      className
    )}
    {...props}
  />
);

export const Button = ({
  className,
  variant = "primary",
  ...props
}: ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline:
      "border-2 border-gray-300 hover:border-gray-400 bg-white text-gray-700",
    ghost: "hover:bg-gray-100 text-gray-700",
  };

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-medium",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "transition-all",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

// Layout components
export const Container = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => (
  <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)} {...props} />
);

export const Stack = ({
  className,
  spacing = "4",
  ...props
}: ComponentPropsWithoutRef<"div"> & { spacing?: string }) => (
  <div className={cn(`space-y-${spacing}`, className)} {...props} />
);

export const Flex = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => (
  <div className={cn("flex", className)} {...props} />
);

export const Grid = ({
  className,
  cols = "1",
  ...props
}: ComponentPropsWithoutRef<"div"> & { cols?: string }) => (
  <div className={cn(`grid grid-cols-${cols} gap-4`, className)} {...props} />
);
