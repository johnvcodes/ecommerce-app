import { ElementType } from "react";
import classNames from "../utilities/class-names";

export type Props<T extends ElementType> = {
  component?: T;
};

const Container = <T extends ElementType = "div">({
  component,

  ...props
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Component = component || "div";

  const { children, className, ...rest } = props;

  return (
    <Component
      {...rest}
      className={classNames("container mx-auto px-6 md:px-0", className)}
    >
      {children}
    </Component>
  );
};

export default Container;
