import { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "@components/common/Button";

type Props = {
  title: string;
  children: ReactNode;
};

function Accordion({ title, children }: Props) {
  const [openAccordion, setOpenAccordion] = useState(false);

  return (
    <div className="w-full">
      <Button
        onClick={() => setOpenAccordion(!openAccordion)}
        aria-controls={title.split(" ").join("-").toLowerCase()}
        aria-label={
          openAccordion ? `Fechar menu ${title}` : `Abrir menu ${title}`
        }
        aria-haspopup="true"
        aria-expanded={openAccordion}
        variant="secondary"
        size="small"
        className="w-full"
      >
        {title}
        {openAccordion ? (
          <ChevronUp size={20} strokeWidth={1.5} />
        ) : (
          <ChevronDown size={20} strokeWidth={1.5} />
        )}
      </Button>
      <div
        id={title.split(" ").join("-").toLowerCase()}
        data-open={openAccordion}
        aria-hidden={!openAccordion}
        className="invisible max-h-0 overflow-hidden transition-all duration-300 ease-in-out data-[open='true']:visible data-[open='true']:max-h-screen"
      >
        {children}
      </div>
    </div>
  );
}

export default Accordion;
