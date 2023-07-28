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
import { nanoid } from "nanoid";
import { TSubcategory } from "../../@types/categories";

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
  firestore: Firestore,
  subcategoryData: Omit<TSubcategory, "uid" | "createdAt">
) {
  const uid = nanoid(20);

  const { title } = subcategoryData;

  try {
    await setDoc(
      doc(firestore, "subcategories", uid).withConverter(subcategoryConverter),
      {
        uid,
        title,
        createdAt: Timestamp.now(),
      }
    );
  } catch (error) {
    throw new Error(String(error));
  }
}

async function getSubcategories(firestore: Firestore) {
  const dataCollection: TSubcategory[] = [];
  const collectionReference = query(
    collection(firestore, "subcategories"),
    orderBy("title", "asc")
  );
  try {
    const data = await getDocs(
      collectionReference.withConverter(subcategoryConverter)
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
