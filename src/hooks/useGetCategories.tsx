import { useEffect, useState } from "react";
import { Firestore } from "firebase/firestore";
import { TMainCategory } from "../@types/categories";
import { getCategories } from "../firebase/firestore/categories";

type Props = {
  firestore: Firestore;
};

function useGetCategories({ firestore }: Props) {
  const [categories, setCategories] = useState<TMainCategory[]>([]);

  useEffect(() => {
    getCategories(firestore)
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  return categories;
}

export default useGetCategories;
