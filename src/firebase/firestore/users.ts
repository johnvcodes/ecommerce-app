import {
  Firestore,
  FirestoreDataConverter,
  Timestamp,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { TUser } from "../../@types/user";

const userConverter: FirestoreDataConverter<TUser> = {
  toFirestore(user) {
    return user;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return data as TUser;
  },
};

async function addUser(
  firestore: Firestore,
  userData: Omit<TUser, "createdAt">
) {
  try {
    await setDoc(
      doc(firestore, "users", userData.uid).withConverter(userConverter),
      {
        ...userData,
        createdAt: Timestamp.now(),
      }
    );
  } catch (error) {
    throw new Error(String(error));
  }
}

async function getUser(firestore: Firestore, userUID: string) {
  try {
    const userData = await getDoc(
      doc(firestore, "users", userUID).withConverter(userConverter)
    );
    if (!userData.exists()) {
      throw new Error("User doesn't exist in the database");
    }
    return userData.data();
  } catch (error) {
    throw new Error(String(error));
  }
}

export { addUser, getUser };
