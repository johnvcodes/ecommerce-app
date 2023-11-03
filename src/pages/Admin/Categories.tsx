import Button from "../../components/common/Button";
import TextInput from "../../components/common/TextInput";

function Categories() {
  return (
    <div>
      <form>
        <TextInput label="Título da categoria" placeholder="Título" />
        <TextInput
          label="Valor da categoria"
          placeholder="Não pode conter acentos"
        />
        <Button type="submit" variant="tertiary">
          Criar categoria
        </Button>
      </form>
    </div>
  );
}

export default Categories;
