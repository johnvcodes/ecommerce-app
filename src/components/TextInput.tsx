import { ComponentPropsWithRef, forwardRef } from "react";

type TextInputProps = Omit<ComponentPropsWithRef<"input">, "className"> & {
  label: string;
  error?: boolean;
  helperText?: string;
};

export default forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { label, error = false, helperText = "", ...props },
  ref,
) {
  return (
    <div className="grid gap-2">
      <label htmlFor={props.id} className="w-fit">
        {label}
      </label>
      <input
        ref={ref}
        {...props}
        className={`${
          error
            ? "border-rose-500 focus:outline-red-300 dark:focus:outline-red-900"
            : "border-neutral-300 placeholder:text-neutral-500 hover:border-neutral-500 focus:border-primary focus:outline-primary/40 dark:border-neutral-700  dark:hover:border-neutral-500 dark:focus:border-primary dark:focus:outline-blue-900"
        } flex items-center border bg-neutral-100 p-2 outline outline-2 outline-offset-0 outline-transparent transition-all duration-300 dark:bg-neutral-900`}
      />
      {helperText && (
        <span
          className={`${error ? "text-rose-500" : "text-neutral-500"} text-xs`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
});
