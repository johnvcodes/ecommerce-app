import {
  ComponentPropsWithoutRef,
  Dispatch,
  ReactNode,
  SetStateAction,
  useRef,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import useClickAway from "../../hooks/useClickAway";
import classNames from "@/utils/class-names";

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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, transform: "translateY(10%)" }}
            animate={{ opacity: 1, transform: "translateY(0%)" }}
            exit={{ opacity: 0, transform: "translateY(10%)" }}
            key={props["id"]}
            id={props["id"]}
            aria-hidden={isOpen}
            className={classNames(
              "absolute z-40 min-w-[7.5rem] border border-neutral-200 bg-neutral-50",
              {
                "bottom-full": position === "top",
                "bottom-full left-0": position === "top-left",
                "bottom-full right-0": position === "top-right",
                "left-full top-0": position === "right",
                "top-full": position === "bottom",
                "left-0 top-full": position === "bottom-left",
                "right-0 top-full": position === "bottom-right",
                "right-full top-0": position === "left",
                "left-1/2 top-[calc(100%_+_0.25rem)] translate-x-1/2":
                  position === "center",
              },
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Menu;
