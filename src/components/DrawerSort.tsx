import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowDownWideNarrow, X } from "lucide-react";
import Button from "@components/Button";
import Drawer from "@components/Drawer";

type Props = {
  options: Array<{ label: string; value: string }>;
};

function DrawerSort({ options }: Props) {
  const [showSort, setShowSort] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

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

  return (
    <Drawer
      handler={
        <Button
          onClick={() => setShowSort(!showSort)}
          aria-label="Menu Ordenar"
          aria-haspopup="true"
          aria-controls="sort-menu"
          aria-expanded={showSort}
          title="Menu Ordenar"
          type="button"
          size="small"
          startIcon={
            <ArrowDownWideNarrow aria-hidden size={20} strokeWidth={1.5} />
          }
        >
          {options.find((option) => option.value === searchParams.get("ordem"))
            ?.label || "Ordenar"}
        </Button>
      }
      id="sort-menu"
      isOpen={showSort}
      setIsOpen={setShowSort}
      position="right"
    >
      <div className="flex flex-col items-end gap-4 p-4">
        <Button
          onClick={() => setShowSort(!showSort)}
          size="small"
          startIcon={<X size={24} strokeWidth={1.5} />}
        >
          Fechar
        </Button>
        <div className="flex w-full flex-col items-end gap-1">
          {options.map((option) => (
            <Button
              onClick={() => handleChangeSort(option.value)}
              key={option.value}
              size="small"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </Drawer>
  );
}

export default DrawerSort;
