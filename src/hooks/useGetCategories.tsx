import { useEffect, useState } from "react";
import { TCategory } from "../@types/categories";
import { getCategories } from "@libs/firebase/firestore/categories";

function useGetCategories() {
  const [categories, setCategories] = useState<TCategory[]>([]);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  return categories;
}

export default useGetCategories;
