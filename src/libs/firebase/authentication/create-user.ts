import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { TUserCredentials } from "@/@types/user";
import { addUser } from "@libs/firebase/firestore/users";
import { auth } from "@libs/firebase/config";

async function createUser(userCredentials: TUserCredentials, isAdmin = false) {
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
