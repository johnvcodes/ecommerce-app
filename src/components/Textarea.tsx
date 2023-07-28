import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";
import { forwardRef } from "react";

type TextareaProps = Omit<TextareaAutosizeProps, "className"> & {
  label: string;
  error?: boolean;
  helperText?: string;
};

export default forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, helperText, ...props },
  ref
) {
  return (
    <div className="grid gap-1">
      <label htmlFor={props.id} className="w-fit">
        {label}
      </label>
      <TextareaAutosize
        ref={ref}
        {...props}
        className={`${
          error
            ? "border-rose-500 focus:outline-red-300 dark:focus:outline-red-900"
            : "border-neutral-300 placeholder:text-neutral-500 hover:border-neutral-500 focus:border-blue-500 focus:outline-blue-300 dark:border-neutral-700  dark:hover:border-neutral-500 dark:focus:border-blue-500 dark:focus:outline-blue-900"
        } flex w-full items-center rounded border bg-neutral-50 p-2 shadow-sm outline outline-2 outline-offset-0 outline-transparent transition-all duration-300 dark:bg-neutral-900`}
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
