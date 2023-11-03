import { ElementType } from "react";
import classNames from "@utils/class-names";

export type Props<T extends ElementType> = {
  component?: T;
  counter?: number;
};

const IconButton = <T extends ElementType = "button">({
  component,
  counter,
  ...props
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Component = component || "button";

  const { className, ...rest } = props;

  return (
    <Component
      className={classNames(
        "relative flex items-center bg-neutral-50 p-1 transition-colors duration-300 hover:bg-neutral-200",
        className,
      )}
      {...rest}
    >
      {counter && counter >= 1 ? (
        <span
          aria-hidden
          className="absolute right-0 top-0 flex items-center justify-center rounded-full bg-primary px-1 text-xs font-extrabold text-neutral-50"
        >
          {counter}
        </span>
      ) : null}
      {props.children}
    </Component>
  );
};

export default IconButton;
