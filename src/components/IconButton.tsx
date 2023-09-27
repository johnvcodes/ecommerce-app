import { ElementType, ReactNode } from "react";

export type Props<T extends ElementType> = {
  component?: T;
  size?: "base" | "small";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

const IconButton = <T extends ElementType = "button">({
  component,
  size = "base",
  startIcon,
  endIcon,
  ...props
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Component = component || "button";

  return (
    <Component {...props} className="flex items-center">
      {props.children}
    </Component>
  );
};

export default IconButton;
