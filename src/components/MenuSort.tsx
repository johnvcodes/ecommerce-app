import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowDownWideNarrow, ChevronDown, ChevronUp } from "lucide-react";
import Menu from "./Menu";
import Button from "./Button";

type Props = {
  options: Array<{ label: string; value: string }>;
};

function MenuSort({ options }: Props) {
  const [showSort, setShowSort] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterRef = useRef<HTMLDivElement>(null);

  function handleClickOut(event: MouseEvent) {
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target as Node)
    ) {
      setShowSort(false);
    }
  }

  function handleChangeSort(value: string) {
    const sortParams = searchParams.get("ordem");
    if (sortParams === value) {
      searchParams.delete("ordem");
      setSearchParams(searchParams);
    } else {
      searchParams.set("ordem", value);
      setSearchParams(searchParams);
    }
    setShowSort(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  });

  return (
    <Menu
      isOpen={showSort}
      setIsOpen={setShowSort}
      position="left"
      handler={
        <Button
          onClick={() => setShowSort(!showSort)}
          aria-label="Menu de Filtros"
          aria-haspopup="true"
          aria-controls="filters-menu"
          aria-expanded={showSort}
          title="Menu de Filtros"
          type="button"
          size="small"
          startIcon={
            <ArrowDownWideNarrow aria-hidden size={20} strokeWidth={1.5} />
          }
          endIcon={
            showSort ? (
              <ChevronUp size={20} strokeWidth={1.5} />
            ) : (
              <ChevronDown size={20} strokeWidth={1.5} />
            )
          }
        >
          {options.find((option) => option.value === searchParams.get("ordem"))
            ?.label || "Ordenar"}
        </Button>
      }
    >
      <div className="flex w-40 flex-col">
        {options.map((option) => (
          <Button
            onClick={() => handleChangeSort(option.value)}
            key={option.value}
            variant="secondary"
            size="small"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </Menu>
  );
}

export default MenuSort;
