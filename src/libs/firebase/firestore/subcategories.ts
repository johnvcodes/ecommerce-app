import {
  FirestoreDataConverter,
  Timestamp,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";

import { firestore } from "../config";
import { TSubcategory } from "@/@types/categories";

const subcategoryConverter: FirestoreDataConverter<TSubcategory> = {
  toFirestore(subcategory) {
    return subcategory;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return data as TSubcategory;
  },
};

async function addSubcategory(
  subcategoryData: Omit<TSubcategory, "uid" | "createdAt">,
) {
  const uid = nanoid(20);

  const { label, value } = subcategoryData;

  try {
    await setDoc(
      doc(firestore, "subcategories", uid).withConverter(subcategoryConverter),
      {
        uid,
        label,
        value,
        createdAt: Timestamp.now(),
      },
    );
  } catch (error) {
    throw new Error(String(error));
  }
}

async function getSubcategories() {
  const dataCollection: TSubcategory[] = [];
  const collectionReference = query(
    collection(firestore, "subcategories"),
    orderBy("value", "asc"),
  );
  try {
    const data = await getDocs(
      collectionReference.withConverter(subcategoryConverter),
    );

    data.forEach((item) => {
      if (!item.exists()) return;
      dataCollection.push(item.data());
    });

    return dataCollection;
  } catch (error) {
    throw new Error(String(error));
  }
}

export { addSubcategory, getSubcategories };
