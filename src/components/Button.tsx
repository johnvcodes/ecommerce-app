/* eslint-disable react/button-has-type */
import { ComponentPropsWithoutRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"button">, "className">;

function Button({ children, type, ...props }: Props) {
  return (
    <button
      {...props}
      className="flex w-fit items-center gap-2 rounded border border-transparent bg-blue-500 px-4 py-2 text-neutral-50 shadow outline outline-2 outline-offset-0 outline-transparent transition-all duration-300 hover:bg-blue-600 focus:outline-blue-300 dark:focus:outline-blue-900"
    >
      {children}
    </button>
  );
}

export default Button;
