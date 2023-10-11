import { ElementType, ReactNode } from "react";

type Props<T extends ElementType> = {
  component?: T;
  header?: ReactNode;
};

function List<T extends ElementType = "ul">({
  component,
  header,
  ...props
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) {
  const Component = component || "ul";
  const { children, ...rest } = props;
  return (
    <section {...rest} className="flex flex-col gap-6">
      {header && <h6 className="font-extrabold">{header}</h6>}
      <Component className="flex flex-col gap-2">{props.children}</Component>
    </section>
  );
}

export default List;
