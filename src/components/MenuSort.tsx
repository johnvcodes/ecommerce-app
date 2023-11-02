import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowsSort,
} from "@tabler/icons-react";
import Button from "@components/Button";
import Menu from "@components/Menu";

type Props = {
  options: Array<{ label: string; value: string }>;
};

function MenuSort({ options }: Props) {
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
    <Menu
      isOpen={showSort}
      setIsOpen={setShowSort}
      position="right"
      handler={
        <Button
          onClick={() => setShowSort(!showSort)}
          aria-label="Menu de Filtros"
          aria-haspopup="true"
          aria-controls="filters-menu"
          aria-expanded={showSort}
          title="Menu de Filtros"
          type="button"
          variant="secondary"
          size="small"
          startIcon={<IconArrowsSort aria-hidden size={20} strokeWidth={1.5} />}
          endIcon={
            showSort ? (
              <IconArrowLeft aria-hidden size={20} strokeWidth={1.5} />
            ) : (
              <IconArrowRight aria-hidden size={20} strokeWidth={1.5} />
            )
          }
          className="w-full"
        >
          {options.find((option) => option.value === searchParams.get("ordem"))
            ?.label || "Ordenar"}
        </Button>
      }
    >
      <div className="flex w-40 flex-col p-1">
        {options.map((option) => (
          <Button
            onClick={() => handleChangeSort(option.value)}
            key={option.value}
            variant="tertiary"
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
