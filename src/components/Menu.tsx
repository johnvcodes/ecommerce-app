import {
  ComponentPropsWithoutRef,
  Dispatch,
  ReactNode,
  SetStateAction,
  useRef,
} from "react";
import useClickAway from "../hooks/useClickAway";
import classNames from "@/utilities/class-names";

type Position =
  | "center"
  | "top-left"
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left";

type Props = Omit<ComponentPropsWithoutRef<"div">, "className"> & {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handler: ReactNode;
  position?: Position;
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
        id={props["id"]}
        data-open={isOpen}
        className={classNames(
          "invisible absolute z-40 min-w-[7.5rem] border border-neutral-200 bg-neutral-50 opacity-0 transition-all duration-300 data-[open='true']:visible data-[open='true']:opacity-100",
          {
            "bottom-full": position === "top",
            "bottom-full left-0": position === "top-left",
            "bottom-full right-0": position === "top-right",
            "left-full top-0": position === "right",
            "top-full": position === "bottom",
            "left-0 top-full": position === "bottom-left",
            "right-0 top-full": position === "bottom-right",
            "right-full top-0": position === "left",
            "left-1/2 top-[calc(100%_+_0.25rem)] -translate-x-1/2":
              position === "center",
          },
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Menu;
