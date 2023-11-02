import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Settings2, X } from "lucide-react";
import { TCategory } from "../@types/categories";
import Accordion from "@components/Accordion";
import Button from "@components/Button";
import Drawer from "@components/Drawer";
import Checkbox from "@components/Checkbox";

type Props = {
  categories: TCategory[];
  handleChangeCategory: (event: ChangeEvent<HTMLInputElement>) => void;
};

function DrawerFilter({ categories, handleChangeCategory }: Props) {
  const [showFilter, setShowFilter] = useState(false);

  const [searchParams] = useSearchParams();

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
      <div className="flex flex-col items-start gap-4 p-4">
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
                onChange={handleChangeCategory}
                key={category.uid}
                id={`mobile-${category.value}`}
                name={category.value}
                value={category.value}
                label={category.label}
                checked={searchParams
                  .getAll("categoria")
                  .includes(category.value)}
              />
            ))}
          </div>
        </Accordion>
      </div>
    </Drawer>
  );
}

export default DrawerFilter;
