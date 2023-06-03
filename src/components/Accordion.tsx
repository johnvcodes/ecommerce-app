import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ReactNode, useRef, useState } from "react";

type Props = {
  title: string;

  content: ReactNode;
};

function Accordion({ title, content }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const accordionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="grid border-b border-slate-300 dark:border-slate-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex items-center justify-between bg-orange-200 p-2 text-slate-950"
      >
        <h2>{title}</h2>
        <ChevronDownIcon
          className="h-4 w-4"
          style={{ transform: isOpen ? "rotate(180deg)" : undefined }}
        />
      </button>
      <div
        ref={accordionRef}
        style={{
          maxHeight: isOpen ? accordionRef.current?.scrollHeight : 0,
          transition: `max-height 300ms`,
          overflow: "hidden",
        }}
        className="flex flex-col"
      >
        {content}
      </div>
    </div>
  );
}

export default Accordion;
