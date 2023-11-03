import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"input"> & {
  label?: string;
};

function Checkbox({ label, ...props }: Props) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        {...props}
        id={props.id || label?.toLowerCase()}
        className="h-4 w-4 flex-shrink-0 appearance-none border border-neutral-300 bg-cover bg-center bg-no-repeat checked:border-primary checked:bg-primary checked:bg-checkbox"
      />
      <label htmlFor={props.id || label?.toLowerCase()}>{label}</label>
    </div>
  );
}

export default Checkbox;
