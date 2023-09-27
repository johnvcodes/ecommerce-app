import { ElementType, ReactNode } from "react";

export type Props<T extends ElementType> = {
  component?: T;
  variant?: "primary" | "secondary";
  size?: "base" | "small";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

const Button = <T extends ElementType = "button">({
  component,
  variant = "primary",
  size = "base",
  startIcon,
  endIcon,
  ...props
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Component = component || "button";

  return (
    <Component
      {...props}
      className={`${
        variant === "secondary"
          ? "bg-neutral-100 hover:bg-neutral-200"
          : "bg-primary text-neutral-50 hover:bg-primary/90"
      } ${
        size === "small" ? "px-2 py-1" : "px-3 py-2"
      } flex items-center justify-center gap-2 transition-colors duration-300`}
    >
      {startIcon}
      {props.children}
      {endIcon}
    </Component>
  );
};

export default Button;
