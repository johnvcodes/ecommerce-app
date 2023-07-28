import {
  Firestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  QueryNonFilterConstraint,
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { TProduct } from "../../@types/product";

const productConverter: FirestoreDataConverter<TProduct> = {
  toFirestore(product) {
    return product;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return data as TProduct;
  },
};

function getRandomRating(max: number, min: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function addProduct(
  firestore: Firestore,
  productData: Omit<TProduct, "uid" | "rating" | "createdAt">
) {
  const uid = nanoid(20);

  try {
    await setDoc(
      doc(firestore, "products", uid).withConverter(productConverter),
      {
        uid,
        ...productData,
        rating: getRandomRating(5, 3),
        createdAt: Timestamp.now(),
      }
    );
  } catch (error) {
    throw new Error(String(error));
  }
}

async function getProduct(firestore: Firestore, productUID: string) {
  try {
    const data = await getDoc(
      doc(firestore, "products", productUID).withConverter(productConverter)
    );
    if (!data.exists()) {
      throw new Error(String("Produto não existente."));
    }
    return data.data();
  } catch (error) {
    throw new Error(String(error));
  }
}

async function getProducts(
  firestore: Firestore,
  constraints: QueryNonFilterConstraint[] = []
) {
  const databaseProducts: TProduct[] = [];

  let lastDocument: QueryDocumentSnapshot<TProduct>;

  let isLastDocument: boolean;

  try {
    const queryProducts = await getDocs(
      query(
        collection(firestore, "products").withConverter(productConverter),
        ...constraints
      )
    );

    queryProducts.forEach((product) => databaseProducts.push(product.data()));

    isLastDocument = queryProducts.size < 1;

    lastDocument = queryProducts.docs[queryProducts.size - 1];
  } catch (error) {
    throw new Error(String(error));
  }

  return { databaseProducts, lastDocument, isLastDocument };
}

export { addProduct, getProduct, getProducts };
