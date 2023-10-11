import {
  ComponentPropsWithoutRef,
  Dispatch,
  ReactNode,
  SetStateAction,
  useRef,
} from "react";
import useClickAway from "../hooks/useClickAway";

type Props = Omit<ComponentPropsWithoutRef<"div">, "className"> & {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handler: ReactNode;
  position?: "left" | "center" | "right";
};

function Menu({
  isOpen,
  setIsOpen,
  handler,
  position = "center",
  ...props
}: Props) {
  const { children, ...rest } = props;

  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, setIsOpen);

  return (
    <div ref={ref} {...rest} className="relative">
      {handler}
      <div
        id={props["aria-controls"]}
        data-open={isOpen}
        className={`${
          position === "left"
            ? "left-0"
            : position === "right"
            ? "right-0"
            : "left-1/2 -translate-x-1/2"
        } invisible absolute top-[calc(100%_+_0.25rem)] min-w-[7.5rem] border border-neutral-200 bg-neutral-50 opacity-0 transition-opacity data-[open='true']:visible data-[open='true']:opacity-100`}
      >
        {children}
      </div>
    </div>
  );
}

export default Menu;
