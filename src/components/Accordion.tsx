import { ChevronDown, ChevronUp } from "lucide-react";
import { ReactNode, useState } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

function Accordion({ title, children }: Props) {
  const [openAccordion, setOpenAccordion] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpenAccordion(!openAccordion)}
        aria-controls={title.split(" ").join("-").toLowerCase()}
        aria-label={
          openAccordion ? `Fechar menu ${title}` : `Abrir menu ${title}`
        }
        aria-haspopup="true"
        aria-expanded={openAccordion}
        className="flex w-full items-center justify-between gap-4 border-b border-neutral-300 py-2"
      >
        {title}
        {openAccordion ? (
          <ChevronUp size={20} strokeWidth={1.5} />
        ) : (
          <ChevronDown size={20} strokeWidth={1.5} />
        )}
      </button>
      <div
        id={title.split(" ").join("-").toLowerCase()}
        data-open={openAccordion}
        aria-hidden={!openAccordion}
        className="invisible max-h-0 overflow-hidden pt-2 data-[open='true']:visible data-[open='true']:max-h-screen"
      >
        {children}
      </div>
    </div>
  );
}

export default Accordion;
