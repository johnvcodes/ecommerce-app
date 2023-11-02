import { nanoid } from "nanoid";
import {
  FirestoreDataConverter,
  Timestamp,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { TCategory } from "@/@types/categories";
import { firestore } from "../config";

const categoryConverter: FirestoreDataConverter<TCategory> = {
  toFirestore(category) {
    return category;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return data as TCategory;
  },
};

async function addCategory(categoryData: Omit<TCategory, "uid" | "createdAt">) {
  const uid = nanoid(20);

  try {
    await setDoc(
      doc(firestore, "categories", uid).withConverter(categoryConverter),
      {
        uid,
        ...categoryData,
        createdAt: Timestamp.now(),
      },
    );
  } catch (error) {
    throw new Error(String(error));
  }
}

async function getCategories() {
  const dataCollection: TCategory[] = [];

  try {
    const data = await getDocs(
      collection(firestore, "categories").withConverter(categoryConverter),
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

export { addCategory, getCategories };
