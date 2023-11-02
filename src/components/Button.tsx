import { ElementType, ReactNode } from "react";
import classNames from "../utilities/class-names";

export type Props<T extends ElementType> = {
  component?: T;
  variant?: "primary" | "secondary" | "tertiary" | "outlined";
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

  const { className, ...rest } = props;

  return (
    <Component
      {...rest}
      className={classNames(
        "flex items-center justify-between gap-2 font-heading uppercase transition-colors duration-300",
        {
          "bg-primary text-neutral-50 hover:bg-primary/80":
            variant === "primary",
          "bg-neutral-50 text-primary hover:bg-neutral-100":
            variant === "secondary",
          "bg-secondary text-neutral-50 hover:bg-secondary/80":
            variant === "tertiary",
          "border-4 border-neutral-50 bg-transparent font-black text-neutral-50 hover:bg-neutral-50/20":
            variant === "outlined",
          "px-8 py-4": size === "base",
          "px-4 py-2": size === "small",
        },
        className,
      )}
    >
      {startIcon}
      {props.children}
      {endIcon}
    </Component>
  );
};

export default Button;
