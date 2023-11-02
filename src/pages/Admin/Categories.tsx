import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

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
