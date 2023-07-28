import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { TUserCredentials } from "../../@types/user";
import createUserDoc from "../firestore/users";

async function createUser(
  auth: Auth,
  firestore: Firestore,
  userCredentials: TUserCredentials,
  isAdmin = false
) {
  const { displayName, email, password } = userCredentials;
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await Promise.all([
    updateProfile(user, {
      displayName,
    }),
    createUserDoc(firestore, {
      uid: user.uid,
      displayName,
      email,
      role: !isAdmin ? "customer" : "admin",
    }),
  ]);
}

export default createUser;
