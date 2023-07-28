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

import { TSize } from "../../@types/size";

const sizeConverter: FirestoreDataConverter<TSize> = {
  toFirestore(size) {
    return size;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return data as TSize;
  },
};

async function addSize(
  firestore: Firestore,
  sizeData: Omit<TSize, "uid" | "createdAt">
) {
  const uid = nanoid(20);

  const { type, value, label } = sizeData;

  try {
    await setDoc(doc(firestore, "sizes", uid).withConverter(sizeConverter), {
      uid,
      type,
      value,
      label: !label ? value : label,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    throw new Error(String(error));
  }
}

async function getSizes(firestore: Firestore) {
  const dataCollection: TSize[] = [];
  const collectionReference = query(
    collection(firestore, "sizes"),
    orderBy("label", "asc")
  );
  try {
    const data = await getDocs(
      collectionReference.withConverter(sizeConverter)
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

export { addSize, getSizes };
