import {
  Firestore,
  FirestoreDataConverter,
  Timestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import { TUser } from "../../@types/user";

const userDocConverter: FirestoreDataConverter<TUser> = {
  toFirestore(user) {
    return user;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return data as TUser;
  },
};

async function createUserDoc(
  firestore: Firestore,
  userData: Omit<TUser, "createdAt">
) {
  await setDoc(
    doc(firestore, "users", userData.uid).withConverter(userDocConverter),
    {
      ...userData,
      createdAt: Timestamp.now(),
    }
  );
}

export default createUserDoc;
