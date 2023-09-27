import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Settings2, X } from "lucide-react";
import { TMainCategory } from "../@types/categories";
import Accordion from "./Accordion";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Drawer from "./Drawer";

type Props = {
  categories: TMainCategory[];
};

function DrawerFilter({ categories }: Props) {
  const [showFilter, setShowFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterRef = useRef<HTMLDivElement>(null);

  function handleClickOut(event: MouseEvent) {
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target as Node)
    ) {
      setShowFilter(false);
    }
  }

  function handleChangeFilter(event: ChangeEvent<HTMLInputElement>) {
    const typeParams = searchParams.getAll("tipo");
    if (typeParams.includes(event.target.value)) {
      setSearchParams({
        tipo: typeParams.filter((type) => type !== event.target.value),
      });
    } else {
      searchParams.append("tipo", event.target.value);
      setSearchParams(searchParams);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  });

  return (
    <Drawer
      id="filters-menu"
      isOpen={showFilter}
      setIsOpen={setShowFilter}
      position="left"
      handler={
        <Button
          onClick={() => setShowFilter(!showFilter)}
          aria-label="Menu de Filtros"
          aria-haspopup="true"
          aria-controls="filters-menu"
          aria-expanded={showFilter}
          title="Menu de Filtros"
          type="button"
          size="small"
          startIcon={<Settings2 aria-hidden size={20} strokeWidth={1.5} />}
        >
          Filtros
        </Button>
      }
    >
      <div className="flex flex-col gap-4 p-4">
        <Button
          onClick={() => setShowFilter(!showFilter)}
          size="small"
          startIcon={<X size={24} strokeWidth={1.5} />}
        >
          Fechar
        </Button>
        <Accordion title="Categorias">
          <div className="grid gap-1">
            {categories.map((category) => (
              <Checkbox
                onChange={handleChangeFilter}
                key={category.uid}
                id={category.value}
                name={category.value}
                value={category.value}
                label={category.label}
                checked={searchParams.getAll("tipo").includes(category.value)}
              />
            ))}
          </div>
        </Accordion>
      </div>
    </Drawer>
  );
}

export default DrawerFilter;
