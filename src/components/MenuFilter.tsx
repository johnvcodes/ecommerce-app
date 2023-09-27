import { ChangeEvent, useState } from "react";
import { TMainCategory } from "../@types/categories";
import Menu from "./Menu";
import Button from "./Button";
import { ChevronDown, ChevronUp, Settings2 } from "lucide-react";
import Checkbox from "./Checkbox";
import { useSearchParams } from "react-router-dom";

type Props = {
  categories: TMainCategory[];
};

function MenuFilter({ categories }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

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

  return (
    <Menu
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      position="left"
      handler={
        <Button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu de Filtros"
          aria-haspopup="true"
          aria-controls="filters-menu"
          aria-expanded={isOpen}
          title="Menu de Filtros"
          type="button"
          size="small"
          startIcon={<Settings2 size={20} strokeWidth={1.5} />}
          endIcon={
            isOpen ? (
              <ChevronUp size={20} strokeWidth={1.5} />
            ) : (
              <ChevronDown size={20} strokeWidth={1.5} />
            )
          }
        >
          Categorias
        </Button>
      }
    >
      <div className="flex flex-col gap-1 p-2">
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
    </Menu>
  );
}

export default MenuFilter;
