import { nanoid } from "nanoid";
import {
  Firestore,
  FirestoreDataConverter,
  Timestamp,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { TMainCategory } from "../../@types/categories";

const categoryConverter: FirestoreDataConverter<TMainCategory> = {
  toFirestore(category) {
    return category;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return data as TMainCategory;
  },
};

async function addCategory(
  firestore: Firestore,
  categoryData: Omit<TMainCategory, "uid" | "createdAt">,
) {
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

async function getCategories(firestore: Firestore) {
  const dataCollection: TMainCategory[] = [];

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
