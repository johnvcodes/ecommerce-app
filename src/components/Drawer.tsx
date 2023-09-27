import {
  ComponentPropsWithRef,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
} from "react";

type Props = Omit<ComponentPropsWithRef<"div">, "className"> & {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  position?: "left" | "right";
  handler: ReactNode;
  children: ReactNode;
};

function Drawer({
  isOpen,
  setIsOpen,
  handler,
  position = "left",
  ...props
}: Props) {
  const { children, ...rest } = props;
  const ref = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node))
      setIsOpen(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div>
      {handler}
      <div
        data-open={isOpen}
        className="invisible fixed inset-0 z-30 bg-black/50 backdrop-blur-sm duration-300 ease-in-out data-[open='true']:visible"
      >
        <div
          ref={ref}
          data-open={isOpen}
          {...rest}
          className={`${position === "left" ? "left-0" : "right-0"} ${
            position === "left" ? "-translate-x-full" : "translate-x-full"
          } invisible fixed top-0 h-screen min-w-[15rem] bg-neutral-50 duration-300 ease-in-out data-[open='true']:visible data-[open='true']:translate-x-0`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Drawer;
