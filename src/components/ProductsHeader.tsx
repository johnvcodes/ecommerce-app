import { useEffect, useState } from "react";
import { TMainCategory } from "../@types/categories";
import { firestore } from "../firebase/config";
import { getCategories } from "../firebase/firestore/categories";
import DrawerFilter from "./DrawerFilter";
import DrawerSort from "./DrawerSort";
import MenuSort from "./MenuSort";
import MenuFilter from "./MenuFilter";

type Props = {
  sortOptions: Array<{ label: string; value: string }>;
};

function ProductsHeader({ sortOptions }: Props) {
  const [categories, setCategories] = useState<TMainCategory[]>([]);

  async function getProductCategories() {
    try {
      const data = await getCategories(firestore);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductCategories();
  }, []);

  return (
    <div className="container mx-auto grid items-center gap-4 px-4 md:px-0">
      <div className="flex items-center gap-4 md:hidden">
        <DrawerFilter categories={categories} />
        <DrawerSort options={sortOptions} />
      </div>
      <div className="hidden items-center gap-4 md:flex">
        <MenuFilter categories={categories} />
        <MenuSort options={sortOptions} />
      </div>
    </div>
  );
}

export default ProductsHeader;
