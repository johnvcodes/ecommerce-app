import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { MainCategory, SubCategory } from "../@types/categories";
import { firestore } from "../firebase/firebaseConfig";

const useCategoriesSnapshot = () => {
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [snapshotCount, setSnapshotCount] = useState<number>(0);

  useEffect(() => {
    const unsubscribeCategoriesSnapshot = onSnapshot(
      doc(firestore, "categories", "mainCategories"),
      (snapshot) => {
        let snapshotMainCategories: MainCategory[] = [];
        if (!snapshot.exists()) return;
        snapshotMainCategories = snapshot.data()
          .mainCategories as MainCategory[];
        setMainCategories(snapshotMainCategories);
        setSnapshotCount((previous) => previous + 1);
      },
      (error) => {
        throw error;
      }
    );
    const unsubscribeSubCategoriesSnapshot = onSnapshot(
      doc(firestore, "categories", "subCategories"),
      (snapshot) => {
        let snapshotSubCategories: SubCategory[] = [];
        if (!snapshot.exists()) return;
        snapshotSubCategories = snapshot.data().subCategories as SubCategory[];
        setSubCategories(snapshotSubCategories);
        setSnapshotCount((previous) => previous + 1);
      },
      (error) => {
        throw error;
      }
    );
    return () => {
      unsubscribeCategoriesSnapshot();
      unsubscribeSubCategoriesSnapshot();
    };
  }, []);

  useEffect(() => {
    if (snapshotCount === 2) setLoading(false);
  }, [snapshotCount]);

  return { mainCategories, subCategories, loading };
};

export default useCategoriesSnapshot;
