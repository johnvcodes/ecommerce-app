import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { TUserCredential } from "@/@types/user";
import { addUser } from "../firestore/users";
import { auth } from "../config";

async function createUser(userCredentials: TUserCredential, isAdmin = false) {
  const { displayName, email, password } = userCredentials;

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await Promise.all([
    updateProfile(user, {
      displayName,
    }),
    addUser({
      uid: user.uid,
      displayName,
      email,
      role: !isAdmin ? "customer" : "admin",
    }),
  ]);
}

export default createUser;
